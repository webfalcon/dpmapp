import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Body,
    View,
    Text,
    Content,
    List,
    ListItem
} from "native-base";

import styles from "./styles";

class BibleBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : '1',
            testament :0,
            book: 1,
            bookIndex : 1
        };
        this.onSelectBook = this.onSelectBook.bind(this);
    }
    onSelectBook(Number){
        if(Number > 39){
            this.setState({
                testament:1,
                book: Number - 39,
                bookIndex :Number
            },
                ()=> {this.props.goChapter(this.state.book, this.state.testament, this.state.bookIndex); }
            );
        }
        else {
            this.setState({book : Number, bookIndex :Number, testament : 0 },()=> {this.props.goChapter(this.state.book, this.state.testament, this.state.bookIndex);})
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <List dataArray={this.props.bible.Testaments}
                          renderRow={(item) =>
                              <View>
                                  <ListItem itemDivider>
                                      <Text>{item.Name}</Text>
                                  </ListItem>
                                  <List dataArray={item.Books}
                                        renderRow={(book) =>
                                            <ListItem onPress={() => this.onSelectBook(book.Number)}>
                                                <Text>{book.Name}</Text>
                                            </ListItem>
                                        }>
                                  </List>
                              </View>
                          }>

                    </List>
                </Content>
            </Container>
        );
    }
}

export default BibleBooks;
