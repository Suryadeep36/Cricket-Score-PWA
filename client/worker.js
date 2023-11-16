
self.addEventListener("push", e => {
    const data = e.data.json();
    if(data.bowTeam == " "){
        data.bowTeam = "Another team yet to bat";
    }
    e.waitUntil(
        self.registration.showNotification(
            data.title, // title of the notification
            {
                body: data.batTeam + "\n" + data.bowTeam + "\n" + data.condition, //the body of the push notification
                image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
                icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
            }
        )
    );
});

