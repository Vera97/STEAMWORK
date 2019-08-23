// for the fake response

export const LOGIN_RESPONSE = {
    code: 1,
    teacherId: 123,
    userData: {
        headIcon: '/',
        introduce: 'I AM AN ORDINARY TEACHER.'
    }
};


export const REQUEST_FAVORITE_COURSE = {
    favorites: [
        {
            courseId: 123,
            title: '课程1',
            cover: '',
            introduce: '收藏'
        },{
            courseId: 1234,
            title: '课程2',
            cover: '',
            introduce: '收藏'
        },{
            courseId: 1235,
            title: '课程3',
            cover: '',
            introduce: '收藏'
        },{
            courseId: 1236,
            title: '课程4',
            cover: '',
            introduce: '收藏'
        },{
            courseId: 1237,
            title: '课程5',
            cover: '',
            introduce: '收藏'
        },
    ]
};

export const SEARCH_COURSE = {
    chunks: [
        {
            title: '课程1',
            introduce: '关键字！',
            courseId: 1,
            cover: ''
        },
        {
            title: '课程2',
            introduce: '关键字！',
            courseId: 2,
            cover: ''
        },
        {
            title: '课程3',
            introduce: '关键字！',
            courseId: 3,
            cover: ''
        },
        {
            title: '课程4',
            introduce: '关键字！',
            courseId: 4,
            cover: ''
        }
    ]
};

export const FILTER_COURSE = {
    chunks:
        [
            {
                title: '课程1',
                introduce: '筛选！',
                courseId: 1,
                cover: ''
            },
            {
                title: '课程2',
                introduce: '筛选！',
                courseId: 2,
                cover: ''
            },
            {
                title: '课程3',
                introduce: '筛选！',
                courseId: 3,
                cover: ''
            },
            {
                title: '课程4',
                introduce: '筛选！',
                courseId: 4,
                cover: ''
            }
        ]
};

export const COURSE_COUNT = {
    totalCount: 120
};

export const COURSE_CHUNK = {
    chunks: [
        {
            title: '课程1',
            introduce: '我是一门好课',
            courseId: 1,
            cover: ''
        },
        {
            title: '课程2',
            introduce: '我是一门好课',
            courseId: 2,
            cover: ''
        },
        {
            title: '课程3',
            introduce: '我是一门好课',
            courseId: 3,
            cover: ''
        },
        {
            title: '课程4',
            introduce: '我是一门好课',
            courseId: 4,
            cover: ''
        },
        {
            title: '课程5',
            introduce: '我是一门好课',
            courseId: 5,
            cover: ''
        }
    ]
};

export const TEACHER_OWN_COURSE = {
    courses: [
        {
            courseId: 123,
            title: '课程1',
            cover: '/',
            introduce: '我老师自己的课程'
        },
        {
            courseId: 333,
            title: '课程2',
            cover: '/',
            introduce: '我老师自己的课程'
        },
        {
            courseId: 555,
            title: '课程3',
            cover: '/',
            introduce: '我老师自己的课程'
        }
    ]
};

export const COURSE_DETAIL = {
    title: '3d打印',
    courseIntro: '我是一门好课',
    courseImgVideo: '/',
    courseSection: [
        {
            courseSectionId: 1,
            courseSectionName: '课时1'
        },{
            courseSectionId: 2,
            courseSectionName: '课时2'
        },{
            courseSectionId: 3,
            courseSectionName: '课时3'
        },{
            courseSectionId: 4,
            courseSectionName: '课时4'
        },{
            courseSectionId: 5,
            courseSectionName: '课时5'
        },{
            courseSectionId: 6,
            courseSectionName: '课时6'
        },
    ],
    relatedCourse: [
        123,
        234,
        456,
        777
    ]
};

export const SINGLE_NUMBER_CODE = {
    code: 1
};

export const CLASSES = {
    classList: [
        {
            classId: 1234,
            className: 'sdd',
            createDate: '2019-11-08'
        },
        {
            classId: 5678,
            className: '小小班',
            createDate: '2020-01-22'
        }
    ]
};

export const ALTER_CLASS_RESPONSE = {
    code: 1,
    class: {
        classId: 1222334,
        className: 'new class',
        createDate: '2019-09-09'
    }
};

export const STUDENT_LIST = {
    code: 1,
    stuList: [
        {
            stuId: 123645,
            stuName: '张全蛋',
            stuNumber: 8888888
        },
        {
            stuId: 123345,
            stuName: '李钢蛋',
            stuNumber: 8888899
        },
        {
            stuId: 333333,
            stuName: '赵铁柱',
            stuNumber: 8884342
        },
        {
            stuId: 555555,
            stuName: '王翠花',
            stuNumber: 84355677
        },
        {
            stuId: 99999,
            stuName: '王二狗',
            stuNumber: 89999393
        }
    ]
};

export const COURSES_IN_CLASS = {
    code: 1,
    courseList: [
        {
            courseId: 9999,
            courseName: '3d打印',
        },
        {
            courseId: 1111,
            courseName: '和稀泥',
        }
    ]
};

export const STUDENT_SCORE = {
    code: 1,
    score: 90
};

export const PERIOD_STEPS = [
    {
        title: '步骤1',
        stepId: 1
    },{
        title: '步骤2',
        stepId: 2
    },{
        title: '步骤3',
        stepId: 3
    },{
        title: '步骤4',
        stepId: 4
    },{
        title: '步骤5',
        stepId: 5
    },{
        title: '步骤6',
        stepId: 6
    },
];

export const STEP_CONTENT = {
    html: '<p>i am <i>the</i> <span style="color: red">content</span></p>'
};

export const STU_QUESTION = {
    code: 1,
    questionList: [123, 234, 567]
};

export const ADD_COURSE = [
    {code:1, courseSectionId: 1},
    {code:1, courseSectionId: 2},
    {code:1, courseSectionId: 3},
    {code:1, courseSectionId: 4},
    {code:1, courseSectionId: 5},
    {code:1, courseSectionId: 6}
];

export const UP_PROGRESS = {
    code: 1
};

export const PROGRESS_STU = {
    code: 1,
    progress: 0.1
};

export const COURSE_LIST =[
    {
        code:1,
        courseId:1
    },
    {
        code:1,
        courseId:2
    },
    {
        code:1,
        courseId:3
    },
    {
        code:1,
        courseId:4
    }
];
export const COURSE_SECTION =[
    {
        code:1,
        courseSectionId:1
    },
    {
        code:1,
        courseSectionId:2
    },
    {
        code:1,
        courseSectionId:3
    },
    {
        code:1,
        courseSectionId:1
    }
];

export const UPLOAD_RESPONSE = {
    code: 1,
    url: '/media/ppt/example.ppt',
    pptImagesList: [
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ]
};

export const GET_SLIDES_RESPONSE = {
    code: 1,
    pptImagesList: [
        'https://images.unsplash.com/photo-1485199692108-c3b5069de6a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1429277005502-eed8e872fe52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1482498081626-c0d36d9c5ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1463736932348-4915535cf6f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
        'https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80',
        'https://images.unsplash.com/photo-1480866179948-2caa74d9082a?ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
        'https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
    ]
};
export const NEW_QUESTION = {
    code: 1,
    quesList: [
        {
            questionId: 1234
        },
        {
            questionId: 5678
        }
    ]
};

export const DELETE_COURSE = {
    code: 1
};

export const EDIT_COURSE = {
    code: 1
};

export const EXERCISE_LIST={
    code:1,
    exerciseList:[
        {
            exerciseId:112,
            title:'文本播放',
            type:'文本播放',
        },
        {
            exerciseId:111,
            title:'资源播放',
            type:'资源播放',
        },
        {
            exerciseId:222,
            title:'互动问答',
            type:'互动问答',
            state:true,
        },
        {
            exerciseId:333,
            title:'人员统计',
            type:'人员统计',
        },
        {
            exerciseId:444,
            title:'小组分组',
            type:'小组分组',
        },
        {
            exerciseId:555,
            title:'讨论记录',
            type:'讨论记录',
        },
        {
            exerciseId: 382893,
            title: '互动讨论',
            type: '互动讨论'
        }
    ]
};
export const EXERCISE_RESOURCE={
    code:1,
    fileType:'wav',
    mediaUrl:'/media/example/media/oo.wav'
};

export const REQUEST_ATTENDANCE_RESPONSE = {
    code: 1,
    stuList: [
        {
            stuId: 123645,
            stuName: '张全蛋',
            stuNumber: 8888888
        },
        {
            stuId: 123345,
            stuName: '李钢蛋',
            stuNumber: 8888899
        },
        {
            stuId: 333333,
            stuName: '赵铁柱',
            stuNumber: 8884342
        },
        {
            stuId: 555555,
            stuName: '王翠花',
            stuNumber: 84355677
        },
        {
            stuId: 99999,
            stuName: '王二狗',
            stuNumber: 89999393
        }
    ],
    stuReadyList: [
        {
            stuId: 333333,
            stuName: '赵铁柱',
            stuNumber: 8884342
        },
        {
            stuId: 555555,
            stuName: '王翠花',
            stuNumber: 84355677
        },
        {
            stuId: 99999,
            stuName: '王二狗',
            stuNumber: 89999393
        }
    ]
};
export const EXERCISE_TEXT = {
    code: 1,//如果code为0，则说明教师没有开启此活动，没有以下字段
    content: '我是开始上课页面的播放文本中的一段文本'
};
export const EXERCISE_QUESTION = {
    code: 1,
    contentQuestion: '我是开始上课页面的播放文本中的一个问题',
    contentAnswerList: [
        {choice: 'A', choiceContent: 'sssa'},
        {choice: 'B', choiceContent: 'sssb'},
        {choice: 'C', choiceContent: 'sssc'},
        {choice: 'D', choiceContent: 'sssd'},
    ],
    answer: ['A', 'B']
};

export const NEW_TEXT = {
    code: 1,
    exerciseId: 1234,
};
export const EDIT_TEXT = {
    code: 1,
};
export const NEW_QUESTIONS = {
    code: 1,
    questionId: 123456789,
};

export const RETURN_PPTPAGE ={
    code: 1,
};
export const GET_PPT_PAGE ={
    code: 1,
    pptPage:3
};
export const IS_START ={
    code: 1,
};
export const IS_OVER ={
    code: 1,
};
export const START_CLASS_RESPONSE = {
    code: 1,
    classroomId: 123
};

export const GET_GROUPS_RESPONSE = {
    code: 1,
    groupList: [
        {
            groupId: 1,
            leaderStuId: 99999,
            groupName: '二狗队',
            members: [
                {
                    stuId: 333333,
                    stuName: '赵铁柱',
                    stuNumber: 8884342
                },
                {
                    stuId: 555555,
                    stuName: '王翠花',
                    stuNumber: 84355677
                }
            ]
        },
        {
            groupId: 2,
            leaderStuId: 123645,
            groupName: '双蛋队',
            members: [
                {
                    stuId: 123345,
                    stuName: '李钢蛋',
                    stuNumber: 8888899
                }
            ]
        }
    ]
};

export const NEW_GROUP_RESPONSE = {
    code: 1,
    groupId: 122
};

export const LOGIN_STU_RESPONSE = {
    code: 1,
    stuId: 123,
    userData: {
        headIcon: '/',
        introduce: 'I am an ordinary student'
    }
};

export const STU_QUESTIONS = {
    code: 1,  //如果是修改的话，scoreList就为0
    question: [
        {question:'ssss1',answer:'ssss1'},
        {question:'ssss2',answer:'ssss2'},
        {question:'ssss3',answer:'ssss3'},
        {question:'ssss4',answer:'ssss4'},
        {question:'ssss5',answer:'ssss5'},
        {question:'ssss6',answer:'ssss6'},
        {question:'ssss7',answer:'ssss7'},
        {question:'ssss8',answer:'ssss8'},
        {question:'ssss9',answer:'ssss9'},
        {question:'ssss10',answer:'ssss10'},
    ]
};

export const PPT_QUESTION_RESPONSE = {
    code: 1,
    questionName: '常见问题1',
    content: '<h1>这是一个<em>常见</em>的<i>问题</i></h1>'
};

export const EXERCISE_DESIGN = {
    code: 1, //如果返回0，说明活动已被关闭。
};
export const STU_EXERCISE_LIST={
    code:1,
    exerciseList:[
        {
            exerciseId:112,
            title:'文本播放',
            type:'文本播放',
        },
        {
            exerciseId:111,
            title:'资源播放',
            type:'资源播放',
        },
        {
            exerciseId:222,
            title:'互动问答',
            type:'互动问答',
        },
        {
            exerciseId:333,
            title:'方案设计',
            type:'方案设计',
        },
        {
            exerciseId: 55555,
            title: '作品展示',
            type: '作品展示',
        },
        {
            exerciseId: 8392839,
            title: '互动讨论',
            type: '互动讨论'
        }
    ]
};
export const EDIT_WEALTH = {
    code: 1,
    wealthAll:120
};
export const GET_WEALTH = {
    code: 1,
    wealthAll:80
};

export const GROUP_CODE = {
    code:1,
    discussionContent: 'html'
};
export const GET_GROUP ={
    code: 1,
    groupList:[
        {
            groupId: 10,
            leaderStuId: 1,
            groupName: 'sss',
            members: [
                {stuId: 12, stuName: 'dss1', stuNumber: 101253421},
                {stuId: 123, stuName: 'dss2', stuNumber: 101255321},
                {stuId: 144, stuName: 'dss3', stuNumber: 101253321},
                {stuId: 155, stuName: 'dss4', stuNumber: 101253441},
                {stuId: 166, stuName: 'dss5', stuNumber: 101253721},
            ]
        },
    ]
};

export const GET_EXERCISE_STATE_COMPLETED = {
    code: 1,
    exerciseStateList: [
        {
            exerciseId: 10,
            exerciseType: '讨论记录',
            state: 1
        }
    ]
};

export const GET_EXERCISE_STATE_UNCOMPLETED = {
    code: 1,
    exerciseStateList: [
        {
            exerciseId: 10,
            exerciseType: '讨论记录',
            state: 0
        }
    ]
};

export const GET_STATE_EXERCISE = {
    code: 1,
    exerciseStateList:[
        {
            exerciseId:112,
            title:'文本播放',
            type:'文本播放',
            state:0,
        },
        {
            exerciseId:111,
            title:'资源播放',
            type:'资源播放',
            state:0,
        },
        {
            exerciseId:222,
            title:'互动问答',
            type:'互动问答',
            state:0,
        },
        {
            exerciseId:333,
            title:'方案设计',
            type:'方案设计',
            state:0
        },
        {
            exerciseId: 55555,
            title: '作品展示',
            type: '作品展示',
            state: 1//0未完成，1已完成
        }
    ]
};
export const EXERCISE_CONTENT_QUESTION = {
    code: 1,
    answerList: ['A', 'B']
};
export const EXERCISE_CONTENT_DESIGN = {
    code: 1,
    designContent: 'sss'
};
export const EXERCISE_CONTENT_PHOTO = {
    code: 1, //如果返回0，说明活动已被关闭。
    photoList: ['https://images.unsplash.com/photo-1485199692108-c3b5069de6a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1485199692108-c3b5069de6a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', ]
};
export const STUDENT_OWN_COURSE = {
    code: 1,
    stuCourseList: [
        {
            stuCourseId: 10011,
            courseId: 1001,
            courseName: '课程1',
            courseSectionList: [
                {
                    courseSectionId: 1,
                    courseSectionName: '课时1',
                },
                {
                    courseSectionId: 2,
                    courseSectionName: '课时2',
                },
                {
                    courseSectionId: 3,
                    courseSectionName: '课时3',
                },
                {
                    courseSectionId: 4,
                    courseSectionName: '课时4',
                },
                {
                    courseSectionId: 5,
                    courseSectionName: '课时5',
                },
                {
                    courseSectionId: 6,
                    courseSectionName: '课时6',
                },
            ]
        },
        {
            stuCourseId: 10022,
            courseId: 1002,
            courseName: '课程2',
            courseSectionList: [
                {
                    courseSectionId: 111,
                    courseSectionName: 'ss11',
                },
                {
                    courseSectionId: 222,
                    courseSectionName: 'ss22',
                },
            ]
        }
    ]
};

// NOTE pptId is pptUrl in api
export const REQUEST_JOIN_CLASS_RESPONSE_SUCCESSFUL = {
    code: 1,
    classroomId: 11,
    groupList: [12, 13, 14],
    courseSectionId: 2,
    pptId: 123,
    pptImagesList: [
        'https://images.unsplash.com/photo-1485199692108-c3b5069de6a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1429277005502-eed8e872fe52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1482498081626-c0d36d9c5ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1463736932348-4915535cf6f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
        'https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80',
        'https://images.unsplash.com/photo-1480866179948-2caa74d9082a?ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
        'https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80',
    ]
};

export const REQUEST_JOIN_CLASS_RESPONSE_FAIL = {
    code: 0
};

export const GET_DISCUSSION_LIST = {
    code: 1,
    discussionList: [
        {
            discussionNumber: 1,
            pptPage: 1
        },
        {
            discussionNumber: 2,
            pptPage: 2
        },
        {
            discussionNumber: 3,
            pptPage: 3
        }
    ]
};

export const DISCUSSION_CONTENT = {
    code: 1,
    discussionContent: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="300" viewBox="0,0,500,300"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><text x="77.44788" y="79.66666" fill="#000000" stroke="none" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="start">一些内容</text><path d="M40.44788,108.66666h1l1,1l4,1l4,2l6,4l2,2h5l6,1h3h2l5,1h5h5h2h3l3,-2l4,-2l4,-1h4h1h2l1,1l1,1h2l1,1h5l6,4h6l14,2h18l12,-1l11,-4l15,-4l6,-1l4,-2h2h3h2h6h5h4h4l2,1" fill="none" stroke="#000000"/></g></svg>'
};

export const NEW_EXERCISE_RESPONSE = {
    code: 1,
    exercise: 3324
};
//admin页面--教师管理
export const GET_TEACHER  = {
    code: 1,
    teacherAccountList: [
        {
            id: 1,
            name: 's1',
            password: 'ss',
            sex: '男',
            introduceHtml: 'text/html'
        },
        {
            id: 2,
            name: 's2',
            password: 'ss',
            sex: '男',
            introduceHtml: 'text/html'
        },
        {
            id: 3,
            name: 's3',
            password: 'ss',
            sex: '女',
            introduceHtml: 'text/html'
        }
    ]
};
export const DELETE_TEACHER  = {
    code: 1
};
export const EDIT_TEACHER  = {
    code: 1
};
//admin标签管理
export const GET_LABEL_LIST  = {
    code: 1,
    labelList: [
        {
            labelId: 1,
            labelName: 's1'
        },
        {
            labelId: 2,
            labelName: 's2'
        },
        {
            labelId: 3,
            labelName: 's3'
        },
    ]
};
export const ADD_LABEL = {
    code: 1,
    labelId: 12
};
export const ADD_TEACHER = {
    code: 1,
    teacherId: 10
};
export const RESPONSE_PPT = {
    code: 1,
    pptUrl:'media/example.pptx'
};
export const GET_LABEL_HAVE = {
    code: 1,
    labelList: [
        {
            labelId: 1,
            labelName: 's1'
        }
    ]
};
export const GET_LABEL_CHECKED = {
    code: 1,
    labelName: 's2'
};
export const SECTION_STEP={
    code:1,
    courseStepId:12
};