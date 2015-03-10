using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Author[] Authors { get; set; }
        public Genre[] Genres { get; set; }
        public decimal Price { get; set; }
        public string ImagePath { get; set; }
        public string Summary { get; set; }
    }
}