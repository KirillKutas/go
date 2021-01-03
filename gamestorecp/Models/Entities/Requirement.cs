namespace gamestorecp.Models.Entities
{
    public class Requirement
    {
        public int Id { get; set; }
        public string OS { get; set; }
        public string Processor { get; set; }
        public string RAM { get; set; }
        public string VideoCard { get; set; }
        public int? FreeHardDiskSpace { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
