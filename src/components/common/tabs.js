import React, { Component } from 'react';

class Tabs extends Component {
    constructor(props){
        super(props);

        this.state = {
            components: props.components,
            tabName: props.tabName,
            activeIndex: 0
        }
    }

    renderComponent(index){
        return this.state.components[index];
    }

    changeIndex(index) {
        this.setState({activeIndex: index});
    }

    render() {
        return (
            <div className='tabs'>
                <div className='tabs__header'>
                    {
                        this.state.tabName.map((name, index) => {
                            return (
                                <div key={index} className={`tabs__header__item ${this.state.activeIndex == index ? 'active' : ''}`}  onClick={() => this.changeIndex(index)}>
                                    {name}
                                </div>
                            );
                        })
                    }
                </div>
                <div className='tabs__content'>
                    {
                        this.renderComponent(this.state.activeIndex)
                    }
                </div>
            </div>
        )
    }
}

export default Tabs;