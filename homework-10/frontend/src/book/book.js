import React from 'react';
import axios from "axios";
import {Button, Form, FormGroup, Input, Label, Table} from "reactstrap";

class Book extends React.Component {
    state = {
        book: {
            id: this.props.match.params.id,
            title: '',
            author:
                {
                    name: ''
                },
            genre:
                {
                    name: ''
                }
        },
        comments: [],
        newComment: {
            id: '',
            text: '',
            book: {id: this.props.match.params.id}
        }
    };

    componentDidMount() {
        axios.get('http://localhost:8080/books/' + this.state.book.id).then((response) => {
            this.setState({
                book: response.data.book,
                comments: response.data.comments
            })
        });
    };

    deleteComment(id) {
        let Id = Number.parseInt(id);
        axios.delete('http://localhost:8080/comment/' + Id).then((response) => {
            this.componentDidMount();
        })
    };

    addComment() {
        axios.post('http://localhost:8080/comment/', this.state.newComment).then((response) => {
            console.log(response);
            this.setState({
                newComment: {
                    text: '',
                    book: {id: this.props.match.params.id}
                }
            });
            this.componentDidMount();
        });
    }

    render() {
        let comments = this.state.comments.map((comment, index) => {
            return (
                <tr key={comment.id}>
                    <td>{index + 1}</td>
                    <td>{comment.text}</td>
                    <td>
                        <Button color="danger" size="small"
                                onClick={this.deleteComment.bind(this, comment.id)}>Delete</Button>
                    </td>
                </tr>
            )
        });
        return (
            <div className={"my-2"}>
                <h2>Title: {this.state.book.title}</h2>
                <h2>Author: {this.state.book.author.name}</h2>
                <h2>Genre: {this.state.book.genre.name}</h2>
                <h3 color="blue">Comments:</h3>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments}
                    </tbody>
                </Table>
                <Form>
                    <FormGroup>
                        <Label>
                            Text:
                            <Input type="textarea" name="text" value={this.state.newComment.text}
                                   onChange={(e) => {
                                       let newComment = this.state.newComment;
                                       newComment.text = e.target.value;
                                       this.setState({newComment});
                                   }}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.addComment.bind(this)}>Add comment</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Book