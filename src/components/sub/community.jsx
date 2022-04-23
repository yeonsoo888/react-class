import React, {useState,useEffect,useRef} from "react";
import Layout from "../common/layout";


export default function Community() {
    const input = useRef(null);
    const textarea = useRef(null);
    const modifyInput = useRef(null);
    const modifyTextarea = useRef(null);
    const [confirmModify,setConfirmModify] = useState(false);

    const dummyPosts = [
        {
            title : "hello1",
            content: "here comes description in detail.",

        },
        {
            title : "hello2",
            content: "here comes description in detail.",

        },
        {
            title : "hello3",
            content: "here comes description in detail.",

        },
        {
            title : "hello4",
            content: "here comes description in detail.",

        },
        {
            title : "hello5",
            content: "here comes description in detail.",

        },
    ]
    
    const [posts, setPosts] = useState(dummyPosts);
    const [newPost,setNewPost] = useState({
        title: "",
        content: "",
    });
    
    const handleChange = (e) => {
        const {value,name} = e.currentTarget;
        setNewPost({...newPost,[name]:value});
    }

    const resetPosts = () => {
        input.current.value = "";
        textarea.current.value = "";
        setNewPost({
            title: "",
            content: "",
        })
    }

    const enableUpdate = (i) => {
        if(!confirmModify) {
            setConfirmModify(!confirmModify);
            setPosts(
                posts.map((item,idx) => {
                    if(idx == i) {
                        item.enableUpdate = true;
                    }
                    return item;
                }) 
            )
        } else {
            window.alert("수정모드를 해제하세요");
        }
    }


    const deletePosts = (i) => {
        const result = posts.filter((_,idx) => { return i !== idx})
        setPosts(result);
    }

    const handleSubmit = () => {
        const inputVal = newPost.title.trim();
        const textareaVal = newPost.content.trim();

        if(inputVal == "" || textareaVal == "") {
            window.alert("정보를 입력하세요");
            return;
        } 
        
        const newPosts = [newPost,...posts];
        setPosts(newPosts);
        
    }

    const handleModify = (i) => {
        const changeTit = modifyInput.current.value;
        const changeCnt = modifyTextarea.current.value;
        if(changeTit.trim() == "" || changeCnt.trim() == "") {
            window.alert("빈칸은 안돼");
            return;
        }
        setPosts(
            posts.map((item,idx) => {
                if(idx == i) {
                    item.enableUpdate = false;
                    item.title = changeTit;
                    item.content = changeCnt;
                }
                return item;
            }) 
        )
        setConfirmModify(!confirmModify);
    }

    const handleModifyCancel = () => {
        setPosts(
            posts.map((item,idx) => {
                item.enableUpdate = false;
                return item;
            }) 
        )
        setConfirmModify(!confirmModify);
    }

    useEffect(() => {
        localStorage.setItem('posts',JSON.stringify(posts));
    },[])

    return (
        <Layout title={"Community"}>
            <div className="inputBox">
                <input type="text" placeholder="제목을 입력하세요" name="title" value={newPost.title} onChange={handleChange} ref={input} /> <br />
                <textarea placeholder="본문을 입력하세요" name="content" value={newPost.content} onChange={handleChange} ref={textarea}></textarea> <br />
                <button type="reset" onClick={resetPosts}>cancel</button>
                <button onClick={handleSubmit}>create</button>
            </div>
            <div className="showBox">
                {posts.map( (item,i) => {
                    
                    return (
                        <article key={i}>
                            {item.enableUpdate 
                            ?
                            <>
                                <input type="text" name="title" ref={modifyInput} defaultValue={item.title} /> <br />
                                <textarea name="content" ref={modifyTextarea} defaultValue={item.content}></textarea> <br />
                                <button onClick={() => handleModifyCancel(i)}>cancel</button>
                                <button onClick={() => handleModify(i)}>save</button>
                            </>
                            :
                            <>
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                                <button onClick={() => enableUpdate(i)}>수정</button>
                                <button onClick={() => deletePosts(i)}>삭제</button>
                            </>
                            }
                        </article>
                    )
                })}
            </div>
        </Layout>
    );
}
