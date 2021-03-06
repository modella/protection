# modella-protection

  Protection for mass-assignment vulnerabilities for
  [modella](http://github.com/modella/modella).

## Installation

    $ component install modella/protection
    $ npm install modella-protection

## API

### Methods affected

modella-protection provides `model#protectedSet` to set attributes using
protection.

### Protection mode

Protection can be used in either a whitelist or blacklist mode. In white list mode,
only attributes with `protected: false` are able to be set by mass assignment.
In black list mode, only variables with `protected: true` will be filtered from
mass-assignment. The default is blacklist mode.

    Model.whiteListProtection = true //Switch from the default to whitelist mode.

### Defining Attributes

To protect a field, pass in the `protected: true` option.

    User.attr('username').attr('admin', { protected: true });

### Setting Fields

    var user = new User();
    var changedFields = user.protectedSet({username: 'Bobby', admin: true});
    // Changed fields = {username: 'Bobby'};
    user.get('admin') === undefined // true

### Nested Objects

    User.attr('preferences', { type: 'object', protected: { modifiedAt: true }});

    var user = new User();

    user.setProtected({
      preferences: { sendEmails: true, sendSms: true, modifiedAt: new Date() }
    });

    user.preferences().modifiedAt === undefined // true
    user.preferences().sendEmails == true // true



## License

  MIT
