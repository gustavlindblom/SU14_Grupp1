using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Boken.Models;

namespace Boken.Controllers
{
    public class AuthorsController : ApiController
    {
        private BookDataContext db = new BookDataContext();
        
        // GET: api/Authors
        public IQueryable<Author> GetAuthors()
        {
            return db.Authors;
        }

        // GET: api/Authors/5
        [ResponseType(typeof(AuthorDetailDTO))]
        public IHttpActionResult GetAuthor(int id)
        {
            Author author = db.Authors.Find(id);
            if (author == null)
            {
                return NotFound();
            }

            // Perform Linq magic to retrieve the top rated books of the author
            List<KeyValuePair<Book, Rating>> bookRatingPairs = new List<KeyValuePair<Book, Rating>>();
            foreach (BookAuthorCoupling bac in db.BookAuthorCouplings.Where(x => x.AuthorId == author.Id))
            {
                var book = db.Books.FirstOrDefault(b => b.Id == bac.BookId);
                var rating = db.Ratings.FirstOrDefault(r => r.Id == book.RatingId);

                bookRatingPairs.Add(new KeyValuePair<Book, Rating>(book, rating));
            }
            bookRatingPairs = bookRatingPairs.OrderByDescending(kvp => kvp.Value.TotalRating / kvp.Value.Votes).ToList();
            var topRatedBooks = new List<Book>();
            for (int i = 0; i < (bookRatingPairs.Count > 10 ? 10 : bookRatingPairs.Count); i++)
                topRatedBooks.Add(bookRatingPairs[i].Key);

            return Ok(new AuthorDetailDTO() { Id = author.Id, Name = author.Name, Biography = author.Biography, TopRatedBooks = topRatedBooks.ToArray() });
        }

        // PUT: api/Authors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAuthor(int id, Author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author.Id)
            {
                return BadRequest();
            }

            db.Entry(author).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Authors
        [ResponseType(typeof(Author))]
        public IHttpActionResult PostAuthor(Author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Authors.Add(author);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = author.Id }, author);
        }

        // DELETE: api/Authors/5
        [ResponseType(typeof(Author))]
        public IHttpActionResult DeleteAuthor(int id)
        {
            Author author = db.Authors.Find(id);
            if (author == null)
            {
                return NotFound();
            }

            foreach (BookAuthorCoupling bac in db.BookAuthorCouplings.Where(x => x.AuthorId == id))
            {
                db.BookAuthorCouplings.Remove(bac);
                int bookId = bac.BookId;
                db.Books.Remove(db.Books.FirstOrDefault(x => x.Id == bookId));
                foreach (BookGenreCoupling bgc in db.BookGenreCouplings.Where(x => x.BookId == bookId)) db.BookGenreCouplings.Remove(bgc);
            }

            db.Authors.Remove(author);
            db.SaveChanges();

            return Ok(author);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorExists(int id)
        {
            return db.Authors.Count(e => e.Id == id) > 0;
        }
    }
}