using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Tile { get; set; }
        public List<Author> Authors { get; set; }
    }
}