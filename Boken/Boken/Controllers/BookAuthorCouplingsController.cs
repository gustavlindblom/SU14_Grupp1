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
    public class BookAuthorCouplingsController : ApiController
    {
        private BookDataContext db = new BookDataContext();

        // GET: api/BookAuthorCouplings
        public IQueryable<BookAuthorCoupling> GetBookAuthorCouplings()
        {
            return db.BookAuthorCouplings;
        }

        // GET: api/BookAuthorCouplings/5
        [ResponseType(typeof(BookAuthorCoupling))]
        public IHttpActionResult GetBookAuthorCoupling(int id)
        {
            BookAuthorCoupling bookAuthorCoupling = db.BookAuthorCouplings.Find(id);
            if (bookAuthorCoupling == null)
            {
                return NotFound();
            }

            return Ok(bookAuthorCoupling);
        }

        // PUT: api/BookAuthorCouplings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookAuthorCoupling(int id, BookAuthorCoupling bookAuthorCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookAuthorCoupling.Id)
            {
                return BadRequest();
            }

            db.Entry(bookAuthorCoupling).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookAuthorCouplingExists(id))
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

        // POST: api/BookAuthorCouplings
        [ResponseType(typeof(BookAuthorCoupling))]
        public IHttpActionResult PostBookAuthorCoupling(BookAuthorCoupling bookAuthorCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookAuthorCouplings.Add(bookAuthorCoupling);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookAuthorCoupling.Id }, bookAuthorCoupling);
        }

        // DELETE: api/BookAuthorCouplings/5
        [ResponseType(typeof(BookAuthorCoupling))]
        public IHttpActionResult DeleteBookAuthorCoupling(int id)
        {
            BookAuthorCoupling bookAuthorCoupling = db.BookAuthorCouplings.Find(id);
            if (bookAuthorCoupling == null)
            {
                return NotFound();
            }

            db.BookAuthorCouplings.Remove(bookAuthorCoupling);
            db.SaveChanges();

            return Ok(bookAuthorCoupling);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookAuthorCouplingExists(int id)
        {
            return db.BookAuthorCouplings.Count(e => e.Id == id) > 0;
        }
    }
}