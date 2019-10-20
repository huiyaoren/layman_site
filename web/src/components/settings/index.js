import React, {Component} from 'react'
import './index.css'
import {Drawer, List, NavBar, Icon, InputItem, Form} from 'antd-mobile'
import {WhiteSpace} from 'antd-mobile';
import {createForm} from 'rc-form';
import storage from '../../utils/storage'

class Settings extends Component {
    state = {
        open: false,
    }
    onOpenChange = (...args) => {
        console.log(args)
        this.setState({open: !this.state.open})
    }

    handleClick = () => {
        // this.inputRef.focus()
        window.location.reload();
    }

    render() {
        const {getFieldProps} = this.props.form;
        // fix in codepen
        const sidebar = (
            <div style={{width: '50vw', boxShadow: '-5PX 0PX 5px 0px white'}}>
                <NavBar
                    style={{background: 'black', width: '100%'}}
                    icon={<Icon style={{fill: 'white'}} type="left"/>}
                    onClick={this.onOpenChange}
                >
                    设置
                </NavBar>
                <List renderHeader={() => 'Common'}>
                    <InputItem
                        {...getFieldProps('server_host', {
                            initialValue:storage.load('server_host') || '',
                            normalize: (value) => {
                                storage.set('server_host', value)
                                return value
                            }
                        })}
                        clear
                        placeholder="Server Host"
                        // onChange={value => {
                        // }}
                        ref={el => this.autoFocusInst = el}
                    >Server</InputItem>
                    <List.Item>
                        <div
                            style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
                            onClick={this.handleClick}
                        >
                            应用设置
                        </div>
                    </List.Item>
                </List>
            </div>
        )

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
                    <NavBar style={{background: 'white'}} onClick={this.onOpenChange}><Icon style={{fill: 'black'}} type="ellipsis"/></NavBar>
                </Drawer>
            </div>
        )
    }
}
Settings = createForm()(Settings);
export default Settings
