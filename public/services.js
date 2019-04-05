myApp.service('appService', function() {
    
    this.currentCity='';
    this.currentRestaurant='';
    this.cart=[];

    this.data=[
        {
            cityName: 'Delhi',
            cityId: 'c1',
            restaurantDetails:[
                {
                    restaurantName: 'Restaurant1',
                    restaurantId: 'c1r1',
                    restaurantDescription: 'restaurant1.. description..',
                    foodMenu:[
                        {
                            categoryName: 'Pizza',
                            categoryId:'c1r1cat1',
                            subCategory:[
                                {
                                    subCategoryName:'Veg Pizza',
                                    subCategoryId:'c1r1cat1sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Veg Pizza1',
                                            foodId:'c1r1cat1sub1f1',
                                            foodPrice: 200.00,
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Pizza2',
                                            foodId:'c1r1cat1sub1f2',
                                            foodPrice: 250.00,
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Pizza3',
                                            foodId:'c1r1cat1sub1f3',
                                            foodPrice: 150.00,
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Pizza',
                                    subCategoryId:'c1r1cat1sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Non veg Pizza1',
                                            foodId:'c1r1cat1sub2f1',
                                            foodPrice: 200.00,
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza2',
                                            foodId:'c1r1cat1sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza3',
                                            foodId:'c1r1cat1sub2f3',
                                            foodPrice: 350.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Beverages',
                            categoryId:'c1r1cat2',
                            subCategory:[
                                {
                                    subCategoryName:'Non-Alcholic Drinks',
                                    subCategoryId:'c1r1cat2sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Pepsi',
                                            foodId:'c1r1cat2sub1f1',
                                            foodPrice: 100.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Coke',
                                            foodId:'c1r1cat2sub1f2',
                                            foodPrice: 60.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Mojito',
                                            foodId:'c1r1cat2sub1f3',
                                            foodPrice: 120.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Alcoholic Drinks',
                                    subCategoryId:'c1r1cat2sub2',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Alcohol1',
                                            foodId:'c1r1cat2sub2f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 10
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Alcohol2',
                                            foodId:'c1r1cat2sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 10
                                                }
                                            ]
                                        }
                                        
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Thali',
                            categoryId:'c1r1cat3',
                            subCategory:[
                                {
                                    subCategoryName:'Veg Thali',
                                    subCategoryId:'c1r1cat3sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Veg Thali1',
                                            foodId:'c1r1cat3sub1f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Thali2',
                                            foodId:'c1r1cat3sub1f2',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Thali',
                                    subCategoryId:'c1r1cat3sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Non veg thali1',
                                            foodId:'c1r1cat3sub2f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Thali2',
                                            foodId:'c1r1cat3sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza3',
                                            foodId:'c1r1cat1sub2f3',
                                            foodPrice: 350.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Burgers',
                            categoryId:'c1r1cat4',
                            subCategory:[
                                {
                                    subCategoryName:'Veggie Burgers',
                                    subCategoryId:'c1r1cat4sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Aloo Tikki Burger1',
                                            foodId:'c1r1cat4sub1f1',
                                            foodPrice: 100.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Paneer Burger2',
                                            foodId:'c1r1cat4sub1f2',
                                            foodPrice: 120.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg cheese Pizza3',
                                            foodId:'c1r1cat4sub1f3',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Burgers',
                                    subCategoryId:'c1r1cat4sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Chicken burger',
                                            foodId:'c1r1cat4sub2f1',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Ham Burger',
                                            foodId:'c1r1cat4sub2f2',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Chicken Tikka Burger',
                                            foodId:'c1r1cat4sub2f3',
                                            foodPrice: 230.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        }
                    ]

                },
                {
                    restaurantName: 'Restaurant2',
                    restaurantId: 'c1r2',
                    restaurantDescription: 'restaurant2.. description..',
                    foodMenu:[
                        {
                            categoryName: 'Pizza',
                            categoryId:'c1r2cat1',
                            subCategory:[
                                {
                                    subCategoryName:'Veg Pizza',
                                    subCategoryId:'c1r2cat1sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Veg Pizza1',
                                            foodId:'c1r2cat1sub1f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Pizza2',
                                            foodId:'c1r2cat1sub1f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Pizza3',
                                            foodId:'c1r2cat1sub1f3',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Pizza',
                                    subCategoryId:'c1r2cat1sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Non veg Pizza1',
                                            foodId:'c1r2cat1sub2f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza2',
                                            foodId:'c1r2cat1sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza3',
                                            foodId:'c1r2cat1sub2f3',
                                            foodPrice: 350.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Beverages',
                            categoryId:'c1r2cat2',
                            subCategory:[
                                {
                                    subCategoryName:'Non-Alcholic Drinks',
                                    subCategoryId:'c1r2cat2sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Pepsi',
                                            foodId:'c1r2cat2sub1f1',
                                            foodPrice: 100.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Coke',
                                            foodId:'c1r2cat2sub1f2',
                                            foodPrice: 60.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Mojito',
                                            foodId:'c1r2cat2sub1f3',
                                            foodPrice: 120.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Alcoholic Drinks',
                                    subCategoryId:'c1r2cat2sub2',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Alcohol1',
                                            foodId:'c1r2cat2sub2f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 10
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Alcohol2',
                                            foodId:'c1r2cat2sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 10
                                                }
                                            ]
                                        }
                                        
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Thali',
                            categoryId:'c1r2cat3',
                            subCategory:[
                                {
                                    subCategoryName:'Veg Thali',
                                    subCategoryId:'c1r2cat3sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Veg Thali1',
                                            foodId:'c1r2cat3sub1f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg Thali2',
                                            foodId:'c1r2cat3sub1f2',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Thali',
                                    subCategoryId:'c1r2cat3sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Non veg thali1',
                                            foodId:'c1r1cat3sub2f1',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Thali2',
                                            foodId:'c1r2cat3sub2f2',
                                            foodPrice: 250.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Non veg Pizza3',
                                            foodId:'c1r2cat1sub2f3',
                                            foodPrice: 350.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            categoryName: 'Burgers',
                            categoryId:'c1r2cat4',
                            subCategory:[
                                {
                                    subCategoryName:'Veggie loaded Burgers',
                                    subCategoryId:'c1r2cat4sub1',
                                    subCategoryType:'veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Aloo Tikki Burger1',
                                            foodId:'c1r2cat4sub1f1',
                                            foodPrice: 100.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Paneer Burger2',
                                            foodId:'c1r2cat4sub1f2',
                                            foodPrice: 120.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Veg cheese Pizza3',
                                            foodId:'c1r2cat4sub1f3',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    subCategoryName:'Non veg Burgers',
                                    subCategoryId:'c1r2cat4sub2',
                                    subCategoryType:'non-veg',
                                    subCategoryItems:[
                                        {
                                            foodName:'Chicken burger',
                                            foodId:'c1r2cat4sub2f1',
                                            foodPrice: 150.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Ham Burger',
                                            foodId:'c1r2cat4sub2f2',
                                            foodPrice: 200.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        },
                                        {
                                            foodName:'Chicken Tikka Burger',
                                            foodId:'c1r2cat4sub2f3',
                                            foodPrice: 230.00,
                                            
                                            qty:0,
                                            tax:[
                                                {
                                                    taxName: 'GST',
                                                    taxValue: 2.5
                                                },
                                                {
                                                    taxName: 'VAT',
                                                    taxValue: 5
                                                }
                                            ]
                                        }
                                    ]

                                }
                            ]
                        }
                    ]

                }
            ]
        }
    ]

});