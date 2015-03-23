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
    public class GenresController : ApiController
    {
        private BookDataContext db = new BookDataContext();

        // GET: api/Genres
        public IQueryable<Genre> GetGenres()
        {
            //foreach (Genre genre in db.Genres)
            //{
            //    var length = genre.Description.Length;
            //    var incerpt = genre.Description.Substring(0, ( length >= 50 ? 50 : length));
            //    genre.Description = incerpt;
            //}
            return db.Genres;
        }

        // GET: api/Genres/5
        [ResponseType(typeof(GenreDetailDTO))]
        public IHttpActionResult GetGenre(int id)
        {
            Genre genre = db.Genres.Find(id);
            if (genre == null)
            {
                return NotFound();
            }

            List<KeyValuePair<Book, Rating>> bookRatingPairs = new List<KeyValuePair<Book, Rating>>();
            foreach (BookGenreCoupling bgc in db.BookGenreCouplings.Where(x => x.GenreId == genre.Id))
            {
                var book = db.Books.FirstOrDefault(b => b.Id == bgc.BookId);
                var rating = db.Ratings.FirstOrDefault(r => r.Id == book.RatingId);

                bookRatingPairs.Add(new KeyValuePair<Book, Rating>(book, rating));
            }
            bookRatingPairs = bookRatingPairs.OrderByDescending(kvp => kvp.Value.TotalRating / kvp.Value.Votes).ToList();
            var topRatedBooks = new List<Book>();
            for (int i = 0; i < 10; i++)
                topRatedBooks.Add(bookRatingPairs[i].Key);

            return Ok(new GenreDetailDTO() { Id = genre.Id, Name = genre.Name, Description = genre.Description, TopRatedBooks = topRatedBooks });
        }

        // PUT: api/Genres/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGenre(int id, Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != genre.Id)
            {
                return BadRequest();
            }

            db.Entry(genre).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenreExists(id))
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

        // POST: api/Genres
        [ResponseType(typeof(Genre))]
        public IHttpActionResult PostGenre(Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Genres.Add(genre);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = genre.Id }, genre);
        }

        // DELETE: api/Genres/5
        [ResponseType(typeof(Genre))]
        public IHttpActionResult DeleteGenre(int id)
        {
            Genre genre = db.Genres.Find(id);
            if (genre == null)
            {
                return NotFound();
            }

            foreach (BookGenreCoupling bgc in db.BookGenreCouplings.Where(x => x.GenreId == id)) db.BookGenreCouplings.Remove(bgc);
            db.Genres.Remove(genre);
            db.SaveChanges();

            return Ok(genre);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GenreExists(int id)
        {
            return db.Genres.Count(e => e.Id == id) > 0;
        }
    }
}