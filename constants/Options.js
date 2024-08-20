export const SelectTravelesList=[
    {
        id:1,
        tittle:'Just Me',
        desc:'A solo Traveles In exloration',
        icon:'🚞',
        people:'1 Peoplw'

    },
    {   id:2,
        tittle:'A Couple',
        desc:'Two Traveles In tandem',
        icon:'👩🏻‍❤️‍👨🏻',
        people:'2 People'

    },
    {
        id:3,
        tittle:'Friends',
        desc:'A Bunch Of Thrill-seeks',
        icon:'🤝',
        people:'5 to 10 People'

    },
    {
        id:4,
        tittle:'Family',
        desc:'A Group Of Fun and Loving ',
        icon:'🎎',
        people:'3 to 5 People'

    },

]

export const BudgetOptionsList = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Affordable travel options with basic amenities',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Comfortable options with good value for money',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium options with high-end amenities',
        icon: '💎',
    }
];

 export const AI_PROMPT = `Generate Travel Plan For Location: {location} for {totalDays} days and {totalNights} nights for {traveler} with a modrate budget with flight details, flight price with booking URL, hotels option list with hotel name, hotel address, price, hotel image URL, geo coordinate rating, descriptions and places to visit nearby with place name, place detail, place image URL, geo coordinate, ticket pricing, time to travel each of the location for {totalDays} days and {totalNights} nights with each day plan with best time to visit in JSON format instead of trip_name give location name `;

