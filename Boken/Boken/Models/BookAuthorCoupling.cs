using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookAuthorCoupling
    {
        public int Id { get; set; }
        // Foreign key
        public int AuthorId { get; set; }
        // Foreign key
        public int BookId { get; set; }
    }
}