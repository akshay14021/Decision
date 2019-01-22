import React from 'react'

import Action from './Action'
import Header from './Header'
import Options from './Options'
import AddOption from './AddOption'
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => {
            return {
                options: []
            }
        })
    }

    handleDeleteOption = (optionPassed) => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                    return option === optionPassed ? false : true
                })
            }
        })
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const optionPicked = this.state.options[randomNum]
        this.setState(() => {
            return {
                selectedOption: optionPicked
            }
        })
    }

    handleSelectedOption = () => {
        this.setState(() => {
            return {
                selectedOption: undefined
            }
        })
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        } else {
            this.setState((prevState) => {
                return {
                    options: [...prevState.options, option]
                }
            })
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState((prevState) => {
                    return {
                        options: options
                    }
                })
            }
        } catch (error) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        const subtitle = 'Put your life in the hand of a computer'

        return (
            <div>
                <Header
                    subtitle={subtitle}
                />
                <Action
                    hasOptions={this.state.options.length <= 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleSelectedOption={this.handleSelectedOption}
                />
            </div>
        )
    }
}

export default IndecisionApp