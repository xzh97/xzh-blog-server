/**
 * @summary 此文件用于创建对应的sql表，
 * @desc 适用于项目初次运行创建sql表
 * */
const {query} = require('./index');

//todo  晚上回去记得把dataGrip的表 复制过来。。 不然两端不能一起开发QAQ
const sqlMap = {
    'xzh_blog':`CREATE TABLE xzh_blog (
    id int(11) NOT NULL AUTO_INCREMENT,
    blog_oid varchar(50) NOT NULL COMMENT '博客oid',
    type int(11) NOT NULL COMMENT '博客类型：1原创, 2转载, 3翻译',
    title varchar(100) NOT NULL COMMENT '博客标题',
    description text COMMENT '博客简介',
    create_time datetime NOT NULL COMMENT '博客创建时间',
    read_number int(11) NOT NULL DEFAULT '0' COMMENT '博客阅读量',
    comment_count int(11) NOT NULL DEFAULT '0' COMMENT '评论量',
    content longtext COMMENT '博客具体内容',
    last_updated_time datetime NOT NULL COMMENT '最后更新时间',
    private tinyint(1) DEFAULT '0' COMMENT '是否私密（只有用户能看到）',
    author varchar(50) NOT NULL COMMENT '作者 存oid',
    category varchar(100) NOT NULL COMMENT '个人分类 1,2,3,4',
    PRIMARY KEY (id),
    UNIQUE KEY xzh_blog_blog_oid_uindex (blog_oid)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='博客内容';`,
  'xzh_blog_category':`CREATE TABLE xzh_blog_category (
    id int(11) NOT NULL AUTO_INCREMENT COMMENT '博客分类id',
    category_oid varchar(50) NOT NULL COMMENT '分类oid 作为value',
    name text NOT NULL COMMENT '分类名',
    create_time datetime NOT NULL COMMENT '个人分类创建时间',
    count int(11) NOT NULL DEFAULT '0' COMMENT '分类下的文章数',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='博客个人分类'`
};
const tableArr = ['xzh_blog','xzh_blog_category'];

const createTable = async sql => {
    return await query(sql)
}

const checkTableIsExist = async table => {
    let _sql = `show tables like '${table}'`
    let result = await query(_sql);
    //console.log('checkTableIsExist',table,result.length);
    return result.length;
}

const init = () => {
    tableArr.forEach(async table => {
        let isExist = await checkTableIsExist(table);
        console.log(isExist)
        if(!isExist){
            createTable(sqlMap[table]).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    })
}
module.exports = init
