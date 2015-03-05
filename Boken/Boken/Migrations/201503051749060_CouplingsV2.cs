namespace Boken.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CouplingsV2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BookCouplings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookId = c.Int(nullable: false),
                        AuthorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BookCouplings");
        }
    }
}
