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
    public class BooksController : ApiController
    {
        private BookDataContext db = new BookDataContext();

        // GET: api/Books
        public IQueryable<BookDTO> GetBooks()
        {
            List<BookDTO> books = new List<BookDTO>();
            
            List<Author> authors = new List<Author>();
            List<Genre> genres = new List<Genre>();
            foreach (Book b in db.Books)
            {
                authors.Clear();
                genres.Clear();

                foreach (BookAuthorCoupling bac in db.BookAuthorCouplings.Where(x => x.BookId == b.Id))
                    authors.Add(db.Authors.FirstOrDefault(a => a.Id == bac.AuthorId));

                foreach (BookGenreCoupling bgc in db.BookGenreCouplings.Where(x => x.BookId == b.Id))
                    genres.Add(db.Genres.FirstOrDefault(g => g.Id == bgc.GenreId));

                books.Add(new BookDTO()
                {
                    Id = b.Id,
                    Title = b.Title,
                    Authors = authors.ToArray(),
                    Genres = genres.ToArray(),
                    Price = b.Price,
                    ImagePath = b.ImagePath
                });
            }
            return books.AsQueryable();
        }

        // GET: api/Books/5
        [ResponseType(typeof(BookDetailDTO))]
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            List<Author> authors = new List<Author>();
            foreach (BookAuthorCoupling bac in db.BookAuthorCouplings.Where(x => x.BookId == book.Id))
                authors.Add(db.Authors.FirstOrDefault(a => a.Id == bac.AuthorId));

            List<Genre> genres = new List<Genre>();
            foreach (BookGenreCoupling bgc in db.BookGenreCouplings.Where(x => x.BookId == book.Id))
                genres.Add(db.Genres.FirstOrDefault(g => g.Id == bgc.GenreId));

            BookDetailDTO bookDetail = new BookDetailDTO()
            {
                Id = book.Id,
                Title = book.Title,
                Authors = authors.ToArray(),
                Genres = genres.ToArray(),
                Year = book.Year,
                Price = book.Price,
                ISBN = book.ISBN,
                ImagePath = book.ImagePath,
                Summary = book.Summary,
                InStock = book.InStock
            };


            return Ok(bookDetail);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        [ResponseType(typeof(Book))]
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(book);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }
    }
}