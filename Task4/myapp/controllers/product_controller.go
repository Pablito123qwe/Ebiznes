package controllers

import (
    "net/http"
    "myapp/database"
    "myapp/models"
    "github.com/labstack/echo/v4"
)

func GetProducts(c echo.Context) error {
    var products []models.Product
    database.DB.Preload("Category").Find(&products)
    return c.JSON(http.StatusOK, products)
}

func CreateProduct(c echo.Context) error {
    product := new(models.Product)
    if err := c.Bind(product); err != nil {
        return c.JSON(http.StatusBadRequest, err)
    }
    database.DB.Create(&product)
    return c.JSON(http.StatusCreated, product)
}
func GetProductByID(c echo.Context) error {
    id := c.Param("id")
    var product models.Product
    if result := database.DB.First(&product, id); result.Error != nil {
        return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
    }
    return c.JSON(http.StatusOK, product)
}

func UpdateProduct(c echo.Context) error {
    id := c.Param("id")
    var product models.Product
    if result := database.DB.First(&product, id); result.Error != nil {
        return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
    }

    if err := c.Bind(&product); err != nil {
        return c.JSON(http.StatusBadRequest, err)
    }

    database.DB.Save(&product)
    return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
    id := c.Param("id")
    if result := database.DB.Delete(&models.Product{}, id); result.Error != nil {
        return c.JSON(http.StatusInternalServerError, result.Error)
    }
    return c.NoContent(http.StatusNoContent)
}