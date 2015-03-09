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
    public class BookGenreCouplingsController : ApiController
    {
        private BookDataContext db = new BookDataContext();

        // GET: api/BookGenreCouplings
        public IQueryable<BookGenreCoupling> GetBookGenreCouplings()
        {
            return db.BookGenreCouplings;
        }

        // GET: api/BookGenreCouplings/5
        [ResponseType(typeof(BookGenreCoupling))]
        public IHttpActionResult GetBookGenreCoupling(int id)
        {
            BookGenreCoupling bookGenreCoupling = db.BookGenreCouplings.Find(id);
            if (bookGenreCoupling == null)
            {
                return NotFound();
            }

            return Ok(bookGenreCoupling);
        }

        // PUT: api/BookGenreCouplings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookGenreCoupling(int id, BookGenreCoupling bookGenreCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookGenreCoupling.Id)
            {
                return BadRequest();
            }

            db.Entry(bookGenreCoupling).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookGenreCouplingExists(id))
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

        // POST: api/BookGenreCouplings
        [ResponseType(typeof(BookGenreCoupling))]
        public IHttpActionResult PostBookGenreCoupling(BookGenreCoupling bookGenreCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookGenreCouplings.Add(bookGenreCoupling);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookGenreCoupling.Id }, bookGenreCoupling);
        }

        // DELETE: api/BookGenreCouplings/5
        [ResponseType(typeof(BookGenreCoupling))]
        public IHttpActionResult DeleteBookGenreCoupling(int id)
        {
            BookGenreCoupling bookGenreCoupling = db.BookGenreCouplings.Find(id);
            if (bookGenreCoupling == null)
            {
                return NotFound();
            }

            db.BookGenreCouplings.Remove(bookGenreCoupling);
            db.SaveChanges();

            return Ok(bookGenreCoupling);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookGenreCouplingExists(int id)
        {
            return db.BookGenreCouplings.Count(e => e.Id == id) > 0;
        }
    }
}