namespace Boken.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Boken.Models.BookDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Boken.Models.BookDataContext context)
        {
            // set up dummy data to always be present
            // Authors
            context.Authors.AddOrUpdate(
                );

            // Genres
            context.Genres.AddOrUpdate(
                );

            // Books
            context.Books.AddOrUpdate(
                );

            // Book-Author couplings
            context.BookAuthorCouplings.AddOrUpdate(
                );

            // Book-Genre couplings
            context.BookGenreCouplings.AddOrUpdate(
                );
        }
    }
}
