import React from "react";
import { shallow } from 'enzyme';
import UsersGrid from "./UsersGrid";

describe('<UsersGrid />', () => {
  const handleScroll = jest.fn();
  const handleUserClick = jest.fn();

  it('renders withouth crashing', () => {
    const users = Array(5).fill(0);
    shallow(
      <UsersGrid
        users={users}
        handleScroll={handleScroll}
        handleUserClick={handleUserClick}
      />
    );
  });

  it('end of catalog is not rendered', () => {
    const users = Array(999).fill(0);
    const endOfList = <h2 className="text-center">End of users catalog.</h2>;

    const grid = shallow(
      <UsersGrid
        users={users}
        handleScroll={handleScroll}
        handleUserClick={handleUserClick}
      />
    );
    expect(grid.contains(endOfList)).toEqual(false);
  });

  it('end of catalog is rendered', () => {
    const users = Array(1000).fill(0);
    const endOfList = <h2 className="text-center">End of users catalog.</h2>;

    const grid = shallow(
      <UsersGrid
        users={users}
        handleScroll={handleScroll}
        handleUserClick={handleUserClick}
      />
    );
    expect(grid.contains(endOfList)).toEqual(true);
  });
})
