## 使用 Navicat 连接 MySQL 数据库时，出现以下报错提示：

```
2059 - authentication plugin 'caching_sha2_password' cannot be loaded...
```

这个报错，中文意思就是：权限插件 `caching_sha2_password` 不能被加载



- 8.0 以前的默认身份验证插件是 `mysql_native_password`
- 8.0 以后的默认身份验证插件是 `caching_sha2_password`



将 MySQL 8.0 的身份认证插件改回为 `mysql_native_password`

- 修改 身份认证插件为 `mysql_native_password`

  ```
  ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
  ```

- 刷新权限

  ```
  FLUSH PRIVILEGES;
  ```

OK，现在再用 Navicat 去连接 MySQL 便可以成功了



## ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

1、查看 mysql 初始的密码策略，
输入语句 “ SHOW VARIABLES LIKE 'validate_password%'; ” 进行查看，

2、首先需要设置密码的验证强度等级，设置 validate_password_policy 的全局参数为 LOW 即可，
输入设值语句 “ set global validate_password_policy=LOW; ” 进行设值

3、当前密码长度为 8 ，如果不介意的话就不用修改了，按照通用的来讲，设置为 6 位的密码，设置 validate_password_length 的全局参数为 6 即可，
输入设值语句 “ set global validate_password_length=6; ” 进行设值，

4、现在可以为 mysql 设置简单密码了，只要满足六位的长度即可，
输入修改语句 “ ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'; ” 可以看到修改成功，表示密码策略修改成功了！！！

关于 mysql 密码策略相关参数；
1）、validate_password_length  固定密码的总长度；
2）、validate_password_dictionary_file 指定密码验证的文件路径；
3）、validate_password_mixed_case_count  整个密码中至少要包含大/小写字母的总个数；
4）、validate_password_number_count  整个密码中至少要包含阿拉伯数字的个数；
5）、validate_password_policy 指定密码的强度验证等级，默认为 MEDIUM；
关于 validate_password_policy 的取值：
0/LOW：只验证长度；
1/MEDIUM：验证长度、数字、大小写、特殊字符；
2/STRONG：验证长度、数字、大小写、特殊字符、字典文件；
6）、validate_password_special_char_count 整个密码中至少要包含特殊字符的个数；
