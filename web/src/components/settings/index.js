import React, {Component} from 'react'
import './index.css'
import {Drawer, List, NavBar, Icon, Flex} from 'antd-mobile'
import {WingBlank, WhiteSpace, Button} from 'antd-mobile';
class Settings extends Component {
    state = {
        open: false,
    }
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({open: !this.state.open});
    }

    render() {

        // fix in codepen
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (
                        <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={this.onOpenChange}>Basic</NavBar>
                    );
                }
                return (<List.Item key={index}
                                   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);

        return (
            <div style={{
                width: '3rem',
                position: 'absolute',
                top: 0,
                left: 0,
            }}>
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight, overflow: 'visible'}}
                    enableDragHandle
                    contentStyle={{color: '#A6A6A6', textAlign: 'center'}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <NavBar style={{background: 'white'}}  onClick={this.onOpenChange}><Icon style={{fill: 'black'}} type="ellipsis"/></NavBar>
                </Drawer>
            </div>
        )
    }
}

export default Settings
