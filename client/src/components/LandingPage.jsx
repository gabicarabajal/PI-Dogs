import React, { Component } from "react";
import { Link } from "react-router-dom";
import s from '../styles/LandingPage.module.css';
import { GoMarkGithub } from 'react-icons/go';

export default class LandingPage extends Component {
    render() {
        return (
            <div className={s.page}>
                <div class={s.wrapper}>
                    <div class={s.typing}>
                        DOGS APP
                    </div>
                </div>
                <div className={s.desc}>
                    <h3>A place to know more about dogs breeds or create a new one!</h3>
                </div>
                <div className={s.enter}>
                    <Link to="/home">
                        <button class={s.cta}>
                            <span>Go ahead</span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>
                    </Link>
                </div>
                <div className={s.git}>
                    <a href="https://github.com/gabicarabajal"><button className={s.btnGit}><GoMarkGithub /></button></a>
                </div>




            </div>
        )
    }
};