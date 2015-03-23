using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string ISBN { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string ImagePath { get; set; }

        // Foreign key
        public int RatingId { get; set; }
        // Navigation property
        public Rating Rating { get; set; }
    }
}