package infrastructure

import (
	gomail "gopkg.in/mail.v2"
)

func NewDialer(env *Env) *gomail.Dialer {
	return gomail.NewDialer(
		env.EmailHost, env.EmailPort, env.EmailFrom,
		env.EmailPass)
}
