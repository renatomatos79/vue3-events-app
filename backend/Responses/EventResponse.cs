namespace eventsapi;

public class EventResponse
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Speaker { get; set; }
    public DateTime Date { get; set; }
    public bool Subscribed { get; set; }
    
    public EventResponse()
    {
        this.Id = string.Empty;    
        this.Title = string.Empty;    
        this.Content = string.Empty;    
        this.Speaker = string.Empty;            
        this.Date = DateTime.Now;
        this.Subscribed = false;
    }
}
