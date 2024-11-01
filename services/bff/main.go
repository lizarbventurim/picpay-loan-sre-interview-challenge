package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/logger"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type Date struct {
	time.Time
}

func (ct *Date) UnmarshalJSON(b []byte) (err error) {
	s := strings.Trim(string(b), "\"")
	if s == "null" {
		ct.Time = time.Time{}
		return
	}
	ct.Time, err = time.Parse("2006-01-02", s)
	return
}

type InstallmentDto struct {
	Value             float64 `json:"value,omitempty"`
	InstallmentNumber int     `json:"installmentNumber,omitempty"`
	DueDate           Date    `json:"dueDate,omitempty"`
}

type RateDto struct {
	Id          int64   `json:"id,omitempty"`
	Name        string  `json:"name"`
	Description string  `json:"description,omitempty"`
	Value       float64 `json:"value,omitempty"`
}

type LoanDto struct {
	Id                 int64            `json:"id,omitempty"`
	Name               string           `json:"name"`
	Description        string           `json:"description,omitempty"`
	Value              float64          `json:"value,omitempty"`
	InstallmentsNumber int              `json:"installmentsNumber,omitempty"`
	Installments       []InstallmentDto `json:"installments,omitempty"`
	StartDate          Date             `json:"startDate,omitempty"`
	Rate               RateDto          `json:"rate,omitempty"`
}

func fetchRates(apiUrl string) ([]RateDto, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/v1/rates", apiUrl))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var rates []RateDto = make([]RateDto, 0)
	if err := json.NewDecoder(resp.Body).Decode(&rates); err != nil {
		return nil, err
	}
	return rates, nil
}

func fetchLoans(apiUrl string) ([]LoanDto, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/v1/loans", apiUrl))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var loans []LoanDto = make([]LoanDto, 0)
	if err := json.NewDecoder(resp.Body).Decode(&loans); err != nil {
		return nil, err
	}
	return loans, nil
}

func fetchLoanById(apiUrl string, id int64) (*LoanDto, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/v1/loans/%d", apiUrl, id))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var loan LoanDto
	if err := json.NewDecoder(resp.Body).Decode(&loan); err != nil {
		return nil, err
	}
	return &loan, nil
}

func saveLoan(apiUrl string, loan LoanDto) error {
	body, err := json.Marshal(loan)
	if err != nil {
		return err
	}
	resp, err := http.Post(fmt.Sprintf("%s/api/v1/loans", apiUrl), "application/json", bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return nil
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8085" // Default port if not specified
	}

	apiUrl := os.Getenv("API_URL")
	if apiUrl == "" {
		apiUrl = "http://localhost:8080" // Default port if not specified
	}

	r := gin.New()
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"*"},
		AllowHeaders:  []string{"*"},
		ExposeHeaders: []string{"*"},
		MaxAge:        12 * time.Hour,
	}))
	r.Use(logger.SetLogger(
		logger.WithLogger(func(_ *gin.Context, l zerolog.Logger) zerolog.Logger {
			return l.Output(gin.DefaultWriter).With().Logger()
		}),
	))

	r.GET("/api/rates", func(c *gin.Context) {
		rates, err := fetchRates(apiUrl)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": rates,
		})
	})

	r.GET("/api/loans", func(c *gin.Context) {
		loans, err := fetchLoans(apiUrl)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": loans,
		})
	})

	r.GET("/api/loans/:id", func(c *gin.Context) {
		id := c.Param("id")
		loanId := int64(0)
		if _, err := fmt.Sscanf(id, "%d", &loanId); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid loan id",
			})
			return
		}
		loan, err := fetchLoanById(apiUrl, loanId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": loan,
		})
	})

	r.POST("/api/loans", func(c *gin.Context) {
		var loan LoanDto
		if err := c.BindJSON(&loan); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := saveLoan(apiUrl, loan); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusCreated, gin.H{
			"message": "Loan created successfully",
		})
	})

	if err := r.Run(":" + port); err != nil {
		log.Fatal().Msg("can' start server with 8080 port")
	}

}
