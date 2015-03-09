using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Boken.Models
{
    public class BookDataContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public BookDataContext() : base("name=BookDataContext")
        {
        }

        public System.Data.Entity.DbSet<Boken.Models.Book> Books { get; set; }

        public System.Data.Entity.DbSet<Boken.Models.Author> Authors { get; set; }

        public System.Data.Entity.DbSet<Boken.Models.Genre> Genres { get; set; }

        public System.Data.Entity.DbSet<Boken.Models.BookAuthorCoupling> BookAuthorCouplings { get; set; }

        public System.Data.Entity.DbSet<Boken.Models.BookGenreCoupling> BookGenreCouplings { get; set; }
    
    }
}
