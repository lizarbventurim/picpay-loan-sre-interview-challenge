package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type RateDto struct {
	Id          int64   `json:"id,omitempty"`
	Name        string  `json:"name"`
	Description string  `json:"description,omitempty"`
	Rate        float64 `json:"rate,omitempty"`
}

func fetchRates(baseUrl string) ([]RateDto, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/v1/rates", baseUrl))
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

func fetchRateByID(baseUrl, id string) (RateDto, error) {
	resp, err := http.Get(fmt.Sprintf("%s/api/v1/rates/%s", baseUrl, id))
	if err != nil {
		return RateDto{}, err
	}
	defer resp.Body.Close()

	var rate RateDto
	if err := json.NewDecoder(resp.Body).Decode(&rate); err != nil {
		return RateDto{}, err
	}

	return rate, nil
}

func createRate(baseUrl string, rate RateDto) (string, error) {
	body, err := json.Marshal(rate)
	if err != nil {
		return "", err
	}
	resp, err := http.Post(fmt.Sprintf("%s/api/v1/rates", baseUrl), "application/json", bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	rbody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(rbody), nil
}

func updateRate(baseUrl, id string, rate RateDto) error {
	body, err := json.Marshal(rate)
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPut, fmt.Sprintf("%s/api/v1/rates/%s", baseUrl, id), bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
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

	baseUrl := os.Getenv("BASE_URL")
	if baseUrl == "" {
		baseUrl = "http://localhost:8080" // Default port if not specified
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"*"},
		AllowHeaders:  []string{"*"},
		ExposeHeaders: []string{"*"},
		MaxAge:        12 * time.Hour,
	}))

	r.GET("/api/rates", func(c *gin.Context) {
		rates, err := fetchRates(baseUrl)
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

	r.GET("/api/rates/:id", func(c *gin.Context) {
		id := c.Param("id")
		rate, err := fetchRateByID(baseUrl, id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": rate,
		})
	})

	r.POST("/api/rates", func(c *gin.Context) {
		var rate RateDto
		if err := c.BindJSON(&rate); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		id, err := createRate(baseUrl, rate)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusCreated, gin.H{
			"id": id,
		})
	})

	r.PUT("/api/rates/:id", func(c *gin.Context) {
		id := c.Param("id")
		var rate RateDto
		if err := c.BindJSON(&rate); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := updateRate(baseUrl, id, rate); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Rate updated successfully",
		})
	})

	r.Run(":" + port)
}
