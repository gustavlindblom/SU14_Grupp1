using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookGenreCoupling
    {
        public int Id { get; set; }
        // foreign key
        public int BookId { get; set; }
        // foreign key
        public int GenreId { get; set; }
    }
}