const socket = io();

socket.on("booking:created", (booking) => {
    const list = document.getElementById("bookings-list");
    if (!list) return;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>Cliente: ${booking.clientName}</h3>
        <p>${booking.clientEmail}</p>
        <span>${booking.date} - ${booking.time}</span>
        <span>${booking.status}</span>
    `;
    list.appendChild(card);
});