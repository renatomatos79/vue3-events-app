using System.Globalization;
using Microsoft.AspNetCore.Mvc;

namespace eventsapi.Controllers;

[ApiController]
[Route("[controller]")]
public class EventsController : ControllerBase
{
    private readonly string FORMAT = "yyyy-MM-ddTHH:mm:ssZ";
    public EventsController()
    {
    }

    [HttpGet(Name = "/events")]
    public IEnumerable<EventResponse> Get()
    {
        return new List<EventResponse>
        {
            new EventResponse {
                Id = "1",
                Title = "Introduction to Vue.js",
                Content = "Join us for an introduction to Vue.js and learn the basics of building web applications with Vue.",
                Speaker = "John Doe",
                Date = DateTime.ParseExact("2024-04-01T10:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "2",
                Title = "React Workshop",
                Content = "Get hands-on experience with React in this workshop. Learn about components, state management, and more.",
                Speaker = "Jane Smith",
                Date = DateTime.ParseExact("2024-04-05T13:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "3",
                Title = "Angular Meetup",
                Content = "Join us for a meetup on Angular. Discover the latest features and best practices.",
                Speaker = "Michael Johnson",
                Date = DateTime.ParseExact("2024-04-10T18:30:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "4",
                Title = "Node.js Conference",
                Content = "Explore the world of Node.js at our conference. Learn about server-side JavaScript and ecosystem.",
                Speaker = "Emily Brown",
                Date = DateTime.ParseExact("2024-04-15T09:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "5",
                Title = "Python Workshop",
                Content = "Join our Python workshop and dive into the fundamentals of Python programming language.",
                Speaker = "David Lee",
                Date = DateTime.ParseExact("2024-04-20T14:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "6",
                Title = "Web Design Masterclass",
                Content = "Learn the principles of web design and create stunning websites in this masterclass.",
                Speaker = "Sophia Garcia",
                Date = DateTime.ParseExact("2024-04-25T11:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "7",
                Title = "UX/UI Seminar",
                Content = "Discover the world of UX/UI design and learn about user-centered design principles.",
                Speaker = "Alex Turner",
                Date = DateTime.ParseExact("2024-04-28T16:30:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "8",
                Title = "DevOps Conference",
                Content = "Join us for a conference on DevOps and learn about CI/CD, containerization, and more.",
                Speaker = "Daniel Wilson",
                Date = DateTime.ParseExact("2024-05-03T10:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "9",
                Title = "JavaScript Meetup",
                Content = "Connect with fellow JavaScript developers at our meetup. Share knowledge and network.",
                Speaker = "Olivia Martinez",
                Date = DateTime.ParseExact("2024-05-08T19:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            },
            new EventResponse {
                Id = "10",
                Title = "Data Science Workshop",
                Content = "Explore the world of data science and learn about machine learning algorithms and data analysis techniques.",
                Speaker = "William Johnson",
                Date = DateTime.ParseExact("2024-05-15T15:00:00Z", FORMAT, CultureInfo.InvariantCulture)
            }
        };
    }
}
