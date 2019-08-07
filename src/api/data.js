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

export const SINGLE_CODE = {
    code: '1'
};

export const SINGLE_NUMBER_CODE = {
    code: 1
};

export const SINGLE_RESPONSE_WORD = {
    code: 'ok'
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
    code: '1',
    questionList: [
        {stuName: 'sfg', stuId: 1, question: 'sss'},
        {stuName: 'sfg', stuId: 2, question: 'sss'},
        {stuName: 'sfg', stuId: 3, question: 'sss'},
        {stuName: 'sfg', stuId: 4, question: 'sss'},
        {stuName: 'sfg', stuId: 5, question: 'sss'},
        {stuName: 'sfg', stuId: 6, question: 'sss'},
        {stuName: 'sfg', stuId: 7, question: 'sss'},
        {stuName: 'sfg', stuId: 8, question: 'sss'},
    ]
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
export const PROGRESS_STU = [
    {
        stuId:'1',
        progress:'0.1'
    },
    {
        stuId:'2',
        progress:'0.3'
    },
    {
        stuId:'3',
        progress:'0.6'
    },
    {
        stuId:'4',
        progress:'0.9'
    }
];
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
            exerciseId:1,
            title:'文本播放',
            type:'文本播放'
        },
        {
            exerciseId:2,
            title:'资源播放',
            type:'资源播放'
        },
        {
            exerciseId:3,
            title:'互动问答',
            type:'互动问答'
        },
        {
            exerciseId:4,
            title:'人员统计',
            type:'人员统计'
        },
        {
            exerciseId:4,
            title:'小组分组',
            type:'小组分组'
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
    code: 1,
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
    answer: ['A', 'B',]
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
    exerciseId: 123456789,
};
export const EDIT_QUESTIONS = {
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

