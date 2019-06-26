import React from "react";
import { shallow } from "enzyme";
import UserCard from "./UserCard";

describe('<UserCard />', () => {
  const user = {
    cell: "601-079-308",
    email: "antonio.caballero@example.com",
    location: {
      city: "santander",
      coordinates: { latitude: "8.1638", longitude: "-58.0546" },
      postcode: 50633,
      state: "comunidad valenciana",
      street: "9308 calle nebrija",
    },
    timezone: {
      offset: "-4:00",
      description: "Atlantic Time (Canada), Caracas, La Paz"
    },
    name: {
      first: "antonio",
      last: "caballero",
      title: "mr",
      username: "greenmeercat556",
    },
    phone: "930-277-859",
    picture: {
      large: "https://randomuser.me/api/portraits/men/86.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/86.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/86.jpg",
    }
  };
  const handleUserClick = jest.fn();

  it('renders without crashing', () => {
    shallow( <UserCard user={user} handleUserClick={handleUserClick} /> )
  });

  it('renders data correctly', () => {
    const firstHTML = <h4 className="user-card__name">{user.name.last}</h4>;
    const lastHTML = <h4 className="user-card__name">{user.name.last}</h4>;
    const usernameHTML = <h4 className="user-card__name user-card__name--username">{user.name.username}</h4>;
    const emailHTML = <h5 className="user-card__email">{user.email}</h5>;
    const card = shallow( <UserCard user={user} handleUserClick={handleUserClick} /> );

    expect(card.contains(firstHTML)).toEqual(true);
    expect(card.contains(lastHTML)).toEqual(true);
    expect(card.contains(usernameHTML)).toEqual(true);
    expect(card.contains(emailHTML)).toEqual(true);
  });

  it('renderes medium image', () => {
    const card = shallow( <UserCard user={user} handleUserClick={handleUserClick} /> );
    expect(card.find('img').prop('src')).toEqual(user.picture.medium);
  });
})
