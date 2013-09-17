var model = require('modella'),
    expect = require('expect.js'),
    protection = require('../');


describe("Proection", function() {
  describe('with protection blacklist', function(){
    var User;

    before(function() {
      User = model('User').attr('name').attr('blackListed', { protected: true });
      User.use(protection);
      User.whiteListProtection = false;
      User.attr('blackListed', { protected: true });
    });

    describe("Model#filteredSet", function() {
      it('does not set values that are blacklisted',function() {
        var user = new User();
        user.filteredSet({blackListed: true});
        expect(user.blackListed()).to.be(undefined);
      });

      it('sets values that aren\'t blacklisted', function() {
        var user = new User();
        user.filteredSet({name: 'Ryan'});
        expect(user.name()).to.be('Ryan');
      });
    });

  });

  describe('with proection whitelist', function() {
    var WhiteListedUser;

    before(function() {
      WhiteListedUser = model('User').attr('name').attr('whiteListed', { protected: false });
      WhiteListedUser.use(protection);
      WhiteListedUser.whiteListProtection = true;
    });

    describe("Model#set", function() {
      it('doesn\'t set values that aren\'t whitelisted', function() {
        var user = new WhiteListedUser();
        user.filteredSet({name: 'Ryan'});
        expect(user.name()).to.not.be('Ryan');
      });

      it('sets values that are whitelisted', function() {
        var user = new WhiteListedUser();
        user.filteredSet({whiteListed: true});
        expect(user.whiteListed()).to.be(true);
      });
    });
  });
});
