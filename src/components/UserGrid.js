import React from 'react';
import { Segment, Input, Table, Dropdown} from 'semantic-ui-react';
import { sortBy, filter } from 'lodash';

const users = [{
    "username": "richard",
    "email": "richard@sample.com",
    "age": 20
},
{
    "username": "michael",
    "email": "michael@sample.com",
    "age": 23
},
{
    "username": "diego",
    "email": "diego@sample.com",
    "age": 24
},
{
    "username": "rene",
    "email": "rene@sample.com",
    "age": 22
},
{
    "username": "agustin",
    "email": "agustin@sample.com",
    "age": 32
}];

const searchOptions = [
    { key: 'username', text: 'Username', value: 'username' },
    { key: 'email', text: 'Email', value: 'email' },
    { key: 'age', text: 'Age', value: 'age' },
]

class UserGrid extends React.Component {
    state = {
        column: null,
        sort: null,
        userList: users,
        keyword: null,
        type: 'username'
    }

    handleSearch = (event, { value }) => {
        const keyword = value;
        const { type } = this.state;

        if (!keyword) {
            this.setState({
                userList: users
            });
            return;
        }

        this.setState({
            userList: filter(users, (user) => {
                console.log({ user });
                if ( type === 'age') {
                    return user[type] === parseInt(keyword);
                }
                return user[type] === keyword;
            })
        })
    }

    handleSort = (columnClicked) => () => {
        const { column, sort, userList } = this.state;

        if (column !== columnClicked) {
            this.setState({
                column: columnClicked,
                sort: 'ascending',
                userList: sortBy(userList, [columnClicked])
            });
        } else {
            this.setState({
                sort: sort === 'ascending' ? 'descending' : 'ascending',
                userList: userList.reverse()
            });
        }

    }

    onTypeChange = (event, { value }) => {
        this.setState({
            type: value
        });
    }

    render() {
        const { column, sort, userList } = this.state;

        return (
            <div>
                <Segment attached="top">
                    <Input
                        onChange={this.handleSearch}
                        label={<Dropdown defaultValue='username' options={searchOptions} onChange={this.onTypeChange} />}
                        labelPosition='right'
                        placeholder="Search" />
                </Segment>
                <Segment attached="bottom">
                    <Table sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'username' ? sort : null}
                                    onClick={this.handleSort('username')}>
                                    Username
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'email' ? sort : null}
                                    onClick={this.handleSort('email')}>
                                    Email
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'age' ? sort : null}
                                    onClick={this.handleSort('age')}>
                                    Age
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { 
                                userList.map(({ username, email, age }) => (
                                    <Table.Row key={username}>
                                        <Table.Cell>{username}</Table.Cell>
                                        <Table.Cell>{email}</Table.Cell>
                                        <Table.Cell>{age}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        );

    }
}

export default UserGrid;