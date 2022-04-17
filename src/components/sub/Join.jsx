import React, { useEffect, useRef, useState } from "react";
import Layout from "../common/layout";

function Join({history}) {
    const initVal = {
        userid: '',
        pwd1: '',
        pwd2: '',
        comments: '',
        email: '',
        interests : null,
        gender : null,
        edu: null,
    }
    const [val,setVal] = useState(initVal);
    const [err,setErr] = useState({});
    const [success,setSuccess] = useState(false);
    const [confirmSubmit,setConfirmSubmit] = useState(false);

    const check = (arg) => {
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*())_+\]]/
        let errs = {};
        if(arg.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요';
        }
        if(arg.pwd1.length < 5 || !eng.test(arg.pwd1) || !num.test(arg.pwd1) || !spc.test(arg.pwd1)) {
            errs.pwd1 = '비밀번호 형식을 확인해주세요';
        }
        if(arg.pwd1 !==  arg.pwd2 || !arg.pwd2) {
            errs.pwd2 = '비밀번호를 확인해주세요';
        }
        if(arg.email.length < 5 || !/@./.test(arg.email)) {
            errs.email = 'email형식을 확인해주세요';
        }
        if(!arg.gender) {
            errs.gender = '성별을 선택하세요';
        }
        if(!arg.interests) {
            errs.interests = '취미를 선택하세요';
        }
        if(!arg.edu) {
            errs.edu = '학력을 선택하세요';
        }
        if(arg.comments.length < 10) {
            errs.comments = "10글자 이상 입력해주세요";
        }
        return errs;
    }

    const handleReset = () => {
        setVal(initVal);
        setErr({});
        setSuccess(false);
        setConfirmSubmit(false);
    }

    const handleRadio = e => {
        const {name} = e.currentTarget;
        const isChk = e.currentTarget.checked;
        setVal({...val,[name]: isChk});
    }

    const handleChk = e => {
        let isChk = false;
        const {name} = e.currentTarget;
        const inputs = e.currentTarget.parentElement.querySelectorAll('input');
        inputs.forEach( el => {
            if(el.checked) isChk = true;
        })
        setVal({...val,[name]: isChk});
    }

    const handleSelect = (e) => {
        const {name,value} = e.currentTarget;
        setVal({...val,[name]: value})
    }


    const handleChange = (e) => {
        const {name,value} = e.currentTarget;
        const newVal = {...val,[name]: value};
        setVal(newVal);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(check(val));
        setConfirmSubmit(true);
    }

    useEffect(() => {
        const len = Object.keys(err);
        if(len.length == 0 && confirmSubmit) {
            setSuccess(true);
            history.push('/');
        } else {
            setSuccess(false);
        }
    },[err]);


    return (
        <Layout title={"membership"}>
            {success && <h2>회원가입을 축하합니다</h2>}
            <article>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>회원가입 폼 양식</legend>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <label htmlFor="userid">user id</label>
                                    </th>
                                    <td>
                                        <input type="text" id="userid" name="userid" placeholder="아이디를 입력하세요" val={val.userid} onChange={handleChange} />
                                        {err.userid && <span>{err.userid}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="pwd1">PASSWORD</label>
                                    </th>
                                    <td>
                                        <input type="password" name="pwd1" id="pwd1" placeholder="비밀번호를 입력하세요" val={val.pwd1} onChange={handleChange} />
                                        {err.pwd1 && <span>{err.pwd1}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="pwd2">PASSWORD</label>
                                    </th>
                                    <td>
                                        <input type="password" name="pwd2" id="pwd2" placeholder="비밀번호 확인" val={val.pwd2} onChange={handleChange} />
                                        {err.pwd2 && <span>{err.pwd2}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="email">E-mail</label>
                                    </th>
                                    <td>
                                        <input type="text" id="email" name="email" placeholder="email을 입력하세요" val={val.email} onChange={handleChange} />
                                        {err.email && <span>{err.email}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        gender
                                    </th>
                                    <td>
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" id="male" name="gender" value="male" onChange={handleRadio} />
                                        
                                        <label htmlFor="female">female</label>
                                        <input type="radio" id="female" name="gender" value="female" onChange={handleRadio} />

                                        {err.gender && <span>{err.gender}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        INTERESTS
                                    </th>
                                    <td>
                                        <label htmlFor="sports">sports</label>
                                        <input type="checkbox" id="sports" name="interests" value="sports" onChange={handleChk} />

                                        <label htmlFor="music">music</label>
                                        <input type="checkbox" id="music" name="interests" value="music" onChange={handleChk} />

                                        <label htmlFor="game">game</label>
                                        <input type="checkbox" id="game" name="interests" value="game" onChange={handleChk} />

                                        {err.interests && <span>{err.interests}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        EDU
                                    </th>
                                    <td>
                                        <select name="edu" id="edu" onChange={handleSelect}>
                                            <option value="">학력을 선택하세요.</option>
                                            <option value="elementary-school">초졸</option>
                                            <option value="middle-school">중졸</option>
                                            <option value="high-school">고졸</option>
                                            <option value="college">대졸</option>
                                        </select>
                                        
                                        {err.edu && <span>{err.edu}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="comments">COMMENTS</label>
                                    </th>
                                    <td>
                                        <textarea name="comments" id="comments" placeholder="" value={val.comments} onChange={handleChange}></textarea>
                                        {err.comments && <span>{err.comments}</span>}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan='2'>
                                        <button type='button' onClick={handleReset}>cancel</button>
                                        <button type='submit'>send</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
            </article>
        </Layout>
    )
}

export default Join;
