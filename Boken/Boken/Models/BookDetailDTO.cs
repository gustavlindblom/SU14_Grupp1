using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookDetailDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public decimal Price { get; set; }
        public DateTime Year { get; set; }
        public List<Author> Authors { get; set; }
    }
}