using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;

namespace LH.BabyLottery.WebApi.Hubs;

[EnableCors("AllowAll")]
public class LiveBlessingHub : Hub
{
    public async Task SendLiveBlessings(string message)
    {
        await Clients.All.SendAsync("ReceiveLiveBlessings", message);
    }
}