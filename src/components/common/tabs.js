import React, { Component } from 'react';

class Tabs extends Component {
    constructor(props){
        super(props);

        this.state = {
            tabName: props.tabName,
            activeIndex: 0
        }
    }

    changeActive(index) {
        const activeIndex = this.state.activeIndex;
        const tabName = this.state.tabName;
        document.querySelector(`#${tabName[activeIndex]}`).classList.remove('active');
        document.querySelector(`#${tabName[index]}`).classList.add('active');
        this.setState({activeIndex: index});

    }

    render() {
        return (
            <div className='tabs'>
                <div className='tabs__header'>
                    {
                        this.state.tabName.map((name, index) => {
                            return (
                                <div key={index} className={`tabs__header__item ${this.state.activeIndex == index ? 'active' : ''}`}  onClick={() => this.changeActive(index)}>
                                    {name}
                                </div>
                            );
                        })
                    }
                </div>
                <div className='tabs__content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Tabs;