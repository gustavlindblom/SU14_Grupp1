namespace Boken.Migrations
{
    using Boken.Models;
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
                    new Author() { Id = 1, Name = "Stephen King", Biography = "Stephen Edwin King, född 21 september 1947 i Portland i Maine, är en amerikansk författare, som skrivit många böcker som har legat på bästsäljarlistorna." +
                                "Han är framförallt verksam inom skräckgenren. Flera av hans böcker har filmatiserats. Han är också känd under pseudonymen Richard Bachman." },
                    new Author() { Id = 2, Name = "Dan Brown", Biography = "Daniel 'Dan' Brown, född 22 juni 1964 i Exeter, New Hampshire, är en amerikansk författare. Hans mesta känd romaner är" +
                                "förmodligen bästsäljarna Änglar och demoner (2000) och Da Vinci-koden (2003). Han har även gett ut två skivor på eget skivbolag." },
                    new Author() { Id = 3, Name = "J.R.R. Tolkien", Biography = "Tolkien har gjort sig ett namn som en av de största inom fantasy-genren och han var den "+
                                "som mer eller mindre grundade den i sin moderna form. Med sina böcker, och då främst kanske trilogin Sagan om ringen, har han väckt beundran hos " +
                                "miljontals läsare världen över. Kännetecknande för hans verk är dess detaljrikedom och den ibland närmast ogreppbara blandningen av folkslag, språk och kulturer." +
                                "När han skulle visa någons grovhet, eller hur hemskt och fruktansvärt något var, tog han på ett magnifikt sätt hjälp av rollpersonerna i boken, som läsaren redan" +
                                "bekantat sig med. Ett exempel är när brödraskapet möter en balrog, då han istället för att fiktivt beskriva denna best, låter trollkarlen Gandalf bli orolig. Gandalf "+
                                "är vid tidpunkten mycket känd för läsaren, och på detta sätt får läsaren en inlevelsefull känsla av hur fruktansvärt och mäktigt monstret är." },
                    new Author() { Id = 4, Name = "Niklas Gustavsson", Biography = "En av de absolut bästa författare någonsin, med sina inspirerande böcker så som: Ölrövhönans äventyr i vattnadalen,"+
                                "Vilken öl i röven?. Niklas Gustavsson slutar aldrig förbrylla sina läsare med djupa, känslosamma berättelser om kärlek, BDSM och öl." },
                    new Author() { Id = 5, Name = "Mikael Filipsson", Biography = "Skriver skitböcker. Vem köper dom?? Bränn möget." },
                    new Author() { Id = 6, Name = "Lena PH", Biography = "Lena syr sina egna kläder." }
                );

            // Genres
            context.Genres.AddOrUpdate(
                    new Genre() { Id = 1, Name = "Skräck", Description = "Skräck är en vid genre som innehåller allt från terror till horror, som är två subgenrer inom denna litteratur, dock med varsitt syfte. Den ena är till för de mera blodiga, lemlästande skräckhistorierna och den andra för de mer djupgående psykologiska, melankoliska skräckhistorierna. Genren skräck innehåller så mycket mer än vad man kanske inser. Med en viss klassificering förväntar vi oss vissa egenskaper från det vi antingen ser eller läser. Det är vissa egenskaper som är utlovade till oss. Beroende på vad det är för del ur skräckgenren som vi kommer i kontakt med så förväntar vi oss något visst från den. Något som våra dagliga liv inte på samma sätt kan ge oss. Den där speciella kicken, den kvarvarande minnesbilden, den där isande känslan nerför ryggraden, det bultande hjärtat och känslan av att man kanske inte är så ensam som man tror. Vissa av dessa saker bär vi med oss längre, vi talar om det med våra bekanta, sprider det vidare. Det är så historier håller sig vid liv. Att berätta historier är ju trots allt en muntlig tradition också, vare sig det är spökhistorier eller folksagor. Skräckgenren spelar på vår rädsla för det okända, för det vi inte förstår, för det vi inte kan se Skräckgenren skildrar oftast en människas, eller en grupp människors, rädsla för något livsfarligt - antingen något naturligt som en galen mördare, eller något övernaturligt som en vampyr eller varulv. Många forskare har definierat skräckgenren utifrån gestaltningen av något främmande och monstruöst. Det finns undantag från reglerna. Det finns vissa historier som är svåra att placera i en specifik kategori inom skräckgenren, till och med historier som är svåra att placera bara inom skräck." },
                    new Genre() { Id = 2, Name = "Thriller", Description = "Nagelbitare. Läs med vita silkeshandskar." },
                    new Genre() { Id = 3, Name = "Fantasy", Description = "Drakar, riddare och troll!" },
                    new Genre() { Id = 4, Name = "Historia", Description = "Faktaböcker om historia." },
                    new Genre() { Id = 5, Name = "Asian Horror", Description = "scary"}
                );

            context.Ratings.AddOrUpdate(
                    new Rating() { Id = 1, Votes = 10, TotalRating = 85 },
                    new Rating() { Id = 2, Votes = 10, TotalRating = 85 },
                    new Rating() { Id = 3, Votes = 10, TotalRating = 25 },
                    new Rating() { Id = 4, Votes = 10, TotalRating = 77 },
                    new Rating() { Id = 5, Votes = 10, TotalRating = 43 },
                    new Rating() { Id = 6, Votes = 10, TotalRating = 85 },
                    new Rating() { Id = 7, Votes = 10, TotalRating = 50 },
                    new Rating() { Id = 8, Votes = 10, TotalRating = 85 },
                    new Rating() { Id = 9, Votes = 10, TotalRating = 99},
                    new Rating() { Id = 10, Votes = 10, TotalRating = 100 },
                    new Rating() { Id = 11, Votes = 10, TotalRating = 85 }
                );

            // Books
            context.Books.AddOrUpdate(
                    new Book() { Id = 1, RatingId = 1, Title = "Sagan om Ringen", Year = 1948, Price = 49.9m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Sagan om ringen eller Härskarringen, i nyöversättning Ringarnas herre (originaltitel The Lord of the Rings), är en fantasyroman av J.R.R. Tolkien. Den utgavs på engelska för första gången 1954–1955 uppdelad i tre volymer med titlarna The Fellowship of the Ring, The Two Towers och The Return of the King. Tolkien hade redan 1937 i Bilbo, en hobbits äventyr, introducerat både härskarringen, och flera av huvudfigurerna i trilogin." },
                    new Book() { Id = 2, RatingId = 2, Title = "Skånes Historia", Year = 1999, Price = 79.9m, ISBN = "345-371-251-121", InStock = 12, ImagePath = "http://www.esff.se/dok/dok_info/skane.gif", Summary = "Jäevlett vikte bog ti å läesa. Ellår iallafall glo på bildårna." },
                    new Book() { Id = 3, RatingId = 3, Title = "Da Vinci Kodden", Year = 2006, Price = 69.9m, ISBN = "123-762-33-1274", InStock = 67, ImagePath = "/Content/Image/davinci.jpg", Summary = "Da Vinci-koden är en roman av den amerikanske författaren Dan Brown. Den följer en professor i religionssymbolik, Robert Langdon, som blir indragen i en mordutredning i Paris och upptäcker en kamp mellan Prieuré de Sion och Opus Dei över huruvida Jesus från Nasaret var gift och hade barn med Maria Magdalena." },
                    new Book() { Id = 4, RatingId = 4, Title = "Änglar och Demoner", Year = 1004, Price = 69.9m, ISBN = "373-37-4532-136", InStock = 247, ImagePath = "/Content/Image/anglarodemoner.jpg", Summary = "Änglar och demoner är en bestseller-roman av den amerikanske författaren Dan Brown, utgiven 2000. Den handlar om Harvard-professorn Robert Langdon och dennes ständiga kamp mot klockan under jakten på en mördare tillhörande Illuminati" },
                    new Book() { Id = 5, RatingId = 5, Title = "Det", Year = 1986, Price = 99.9m, ISBN = "532-234-137-1251", InStock = 12, ImagePath = "/Content/Image/Det.jpg", Summary = "Det (engelsk originaltitel It) är en roman från 1986 av Stephen King. Den gavs ut i svensk översättning 1987.[1] Boken har även filmatiserats." },
                    new Book() { Id = 6, RatingId = 6, Title = "Att Filla eller att Fjonka", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." },
                    new Book() { Id = 7, RatingId = 7, Title = "Angular pagination - eller, Hur jag fick min hjärnblödning", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." },
                    new Book() { Id = 8, RatingId = 8, Title = "Filtrering är nog bara 1/2 scrum-poäng", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." },
                    new Book() { Id = 9, RatingId = 9, Title = "Scrum-master är envåldshärskare, och hör sen!", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." },
                    new Book() { Id = 10, RatingId = 10, Title = "Man äter aldrig kålrabbi, för han är inte b-juden", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." },
                    new Book() { Id = 11, RatingId = 11, Title = "Vad fan är kålrabbi?", Year = 1948, Price = 9.99m, ISBN = "123-234-643-12", InStock = 46, ImagePath = "/Content/Image/saganomringen.jpg", Summary = "Hobbitar är bara små på utsidan." }
                );

            // Book-Author couplings
            context.BookAuthorCouplings.AddOrUpdate(
                new BookAuthorCoupling() { Id = 1, AuthorId = 3, BookId = 1 },
                new BookAuthorCoupling() { Id = 3, AuthorId = 5, BookId = 2 },
                new BookAuthorCoupling() { Id = 4, AuthorId = 2, BookId = 3 },
                new BookAuthorCoupling() { Id = 5, AuthorId = 2, BookId = 4 },
                new BookAuthorCoupling() { Id = 6, AuthorId = 1, BookId = 5 },
                new BookAuthorCoupling() { Id = 9, AuthorId = 3, BookId = 6 },
                new BookAuthorCoupling() { Id = 10, AuthorId = 3, BookId = 7 },
                new BookAuthorCoupling() { Id = 11, AuthorId = 3, BookId = 8 },
                new BookAuthorCoupling() { Id = 12, AuthorId = 5, BookId = 9 },
                new BookAuthorCoupling() { Id = 13, AuthorId = 4, BookId = 10 },
                new BookAuthorCoupling() { Id = 14, AuthorId = 5, BookId = 11 },
                new BookAuthorCoupling() { Id = 15, AuthorId = 3, BookId = 11 }
                );

            // Book-Genre couplings
            context.BookGenreCouplings.AddOrUpdate(
                new BookGenreCoupling() { Id = 1, GenreId = 3, BookId = 1 },
                new BookGenreCoupling() { Id = 3, GenreId = 3, BookId = 2 },
                new BookGenreCoupling() { Id = 4, GenreId = 2, BookId = 3 },
                new BookGenreCoupling() { Id = 5, GenreId = 3, BookId = 4 },
                new BookGenreCoupling() { Id = 6, GenreId = 1, BookId = 5 },
                new BookGenreCoupling() { Id = 9, GenreId = 3, BookId = 6 },
                new BookGenreCoupling() { Id = 10, GenreId = 3, BookId = 7 },
                new BookGenreCoupling() { Id = 11, GenreId = 3, BookId = 8 },
                new BookGenreCoupling() { Id = 12, GenreId = 3, BookId = 9 },
                new BookGenreCoupling() { Id = 13, GenreId = 3, BookId = 10 },
                new BookGenreCoupling() { Id = 14, GenreId = 3, BookId = 11 },
                new BookGenreCoupling() { Id = 15, GenreId = 2, BookId = 11 }
                );
        }
    }
}
