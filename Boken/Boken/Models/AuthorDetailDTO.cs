using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class AuthorDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public Book[] TopRatedBooks { get; set; }
    }
}