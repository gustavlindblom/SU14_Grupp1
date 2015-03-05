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
    public class BookCouplingsController : ApiController
    {
        private DataContext db = new DataContext();

        // GET: api/BookCouplings
        public IQueryable<BookCoupling> GetBookCouplings()
        {
            return db.BookCouplings;
        }

        // GET: api/BookCouplings/5
        [ResponseType(typeof(BookCoupling))]
        public IHttpActionResult GetBookCoupling(int id)
        {
            BookCoupling bookCoupling = db.BookCouplings.Find(id);
            if (bookCoupling == null)
            {
                return NotFound();
            }

            return Ok(bookCoupling);
        }

        // PUT: api/BookCouplings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookCoupling(int id, BookCoupling bookCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookCoupling.Id)
            {
                return BadRequest();
            }

            db.Entry(bookCoupling).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCouplingExists(id))
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

        // POST: api/BookCouplings
        [ResponseType(typeof(BookCoupling))]
        public IHttpActionResult PostBookCoupling(BookCoupling bookCoupling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookCouplings.Add(bookCoupling);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookCoupling.Id }, bookCoupling);
        }

        // DELETE: api/BookCouplings/5
        [ResponseType(typeof(BookCoupling))]
        public IHttpActionResult DeleteBookCoupling(int id)
        {
            BookCoupling bookCoupling = db.BookCouplings.Find(id);
            if (bookCoupling == null)
            {
                return NotFound();
            }

            db.BookCouplings.Remove(bookCoupling);
            db.SaveChanges();

            return Ok(bookCoupling);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookCouplingExists(int id)
        {
            return db.BookCouplings.Count(e => e.Id == id) > 0;
        }
    }
}