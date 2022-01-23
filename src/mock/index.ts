const Mock = require('mockjs')


// 登录
Mock.mock(RegExp('/api/user/login'), 'post', (options: any) => {
    let params = JSON.parse(options.body);
	let {username = '', password = ''} = params;
        return {
            code: 0,
            data: {
                username,
                password,
                admin_token: +new Date() + '',
                roles: [username]
            }
        }
	
})


// 获取用户信息
Mock.mock(RegExp('/api/user/info'), 'get', (options: any) => {
    return {
        code: 0,
        flag: 1,
        data: {
            username: 'admin',
            password: '123456',
            avatar: 'https://img2.bosszhipin.com/boss/avatar/avatar_15.png',
            roles: ['admin'],                
        }
    }
	
})

// 登出
Mock.mock(RegExp('/api/user/logout'), 'get', (options: any) => {
    return {
        code: 0,
        flag: 1,
        data: 'logout!!!'
    }
	
})
