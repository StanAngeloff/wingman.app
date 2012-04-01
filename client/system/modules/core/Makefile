VENDOR_PATH  := cache/vendor/
BUNDLES_PATH := bundles/

JQUERY_VERSION  := 1.7.2
JQUERY_DOWNLOAD := http://code.jquery.com/jquery-$(JQUERY_VERSION).js
JQUERY_PATH     := $(VENDOR_PATH)jquery/

BOOTSTRAP_DOWNLOAD := http://twitter.github.com/bootstrap/assets/bootstrap.zip
BOOTSTRAP_PATH     := $(VENDOR_PATH)bootstrap/

UNDERSCORE_DOWNLOAD := http://documentcloud.github.com/underscore/underscore.js
UNDERSCORE_PATH     := $(VENDOR_PATH)underscore/

BACKBONE_DOWNLOAD := http://documentcloud.github.com/backbone/backbone.js
BACKBONE_PATH     := $(VENDOR_PATH)backbone/

HANDLEBARS_VERSION  := 1.0.0.beta.6
HANDLEBARS_DOWNLOAD := http://cloud.github.com/downloads/wycats/handlebars.js/handlebars-$(HANDLEBARS_VERSION).js
HANDLEBARS_PATH     := $(VENDOR_PATH)handlebars/

LESS_VERSION  := 1.3.0
LESS_DOWNLOAD := https://raw.github.com/cloudhead/less.js/master/dist/less-$(LESS_VERSION).js
LESS_PATH     := $(VENDOR_PATH)less/

RANDEXP_DOWNLOAD := https://raw.github.com/fent/randexp.js/master/build/randexp.min.js
RANDEXP_PATH     := $(VENDOR_PATH)randexp/

BUNDLE_SCRIPTS := $(BUNDLES_PATH)scripts-development.js
BUNDLE_STYLES  := $(BUNDLES_PATH)styles-development.css

.PHONY: default all install-dependencies install-script install-jquery install-bootstrap install-underscore install-backbone install-handlebars install-less install-randexp bundle-dependencies bundle-component bundle-scripts bundle-styles

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

all: install-dependencies bundle-dependencies

install-dependencies: install-jquery install-bootstrap install-underscore install-backbone install-handlebars install-less install-randexp

install-script:
	@mkdir -p "$($(SCRIPT)_PATH)"
	@curl -so "$($(SCRIPT)_PATH)$(shell basename $($(SCRIPT)_DOWNLOAD))" "$($(SCRIPT)_DOWNLOAD)"
	@echo "$($(SCRIPT)_DOWNLOAD) successfully installed in $($(SCRIPT)_PATH)."

install-jquery:
	@$(MAKE) --no-print-directory install-script SCRIPT=JQUERY

install-bootstrap:
	$(eval BOOTSTRAP_TMP := /tmp/$(shell basename $(BOOTSTRAP_DOWNLOAD)))
	@curl -so "$(BOOTSTRAP_TMP)" "$(BOOTSTRAP_DOWNLOAD)"
	@if [ -d "$(BOOTSTRAP_PATH)" ]; then \
		rm -Rf "$(BOOTSTRAP_PATH)" ; \
	fi
	@mkdir -p "$(VENDOR_PATH)"
	@unzip -qq "$(BOOTSTRAP_TMP)" -d "$(VENDOR_PATH)"
	@for icons in 'glyphicons-halflings.png' 'glyphicons-halflings-white.png'; do \
		sed -e "s#../img/$${icons}#data:image/png;base64,$$( base64 -w0 "$(BOOTSTRAP_PATH)img/$${icons}" )#" -i "$(BOOTSTRAP_PATH)css/bootstrap.css" ; \
	done
	@for alias in 'css > styles' 'img > images' 'js > scripts'; do \
		mv "$(BOOTSTRAP_PATH)$${alias%% > *}" "$(BOOTSTRAP_PATH)$${alias##* > }" ; \
	done
	@for merge in 'styles/bootstrap-responsive.css > styles/bootstrap.css'; do \
		source="$(BOOTSTRAP_PATH)$${merge%% > *}" ; \
		target="$(BOOTSTRAP_PATH)$${merge##* > }" ; \
		echo           >> "$$target" ; \
		cat "$$source" >> "$$target" ; \
		rm  "$$source" ; \
	done
	@for garbage in 'images' 'scripts/bootstrap.min.js' 'styles/bootstrap.min.css' 'styles/bootstrap-responsive.min.css'; do \
		rm -R "$(BOOTSTRAP_PATH)$${garbage}" ; \
	done
	@echo "$(BOOTSTRAP_DOWNLOAD) successfully installed in $(BOOTSTRAP_PATH)."

define UNDERSCORE_AMD_PATCH
--- underscore.js	2012-01-01 12:00:00.000000000 +0000
+++ underscore.js	2012-01-01 12:00:00.000000000 +0000
@@ -996,4 +996,12 @@
		 return this._wrapped;
	 };
 
+  // AMD define happens at the end for compatibility with AMD loaders
+  // that don't enforce next-turn semantics on modules.
+  if (typeof define === 'function' && define.amd) {
+    define('underscore', function() {
+      return _;
+    });
+  }
+
 }).call(this);
endef
export UNDERSCORE_AMD_PATCH
install-underscore:
	@$(MAKE) --no-print-directory install-script SCRIPT=UNDERSCORE
	@( cd $(UNDERSCORE_PATH) && echo "$$UNDERSCORE_AMD_PATCH" | patch --no-backup-if-mismatch -p0 )

define BACKBONE_AMD_PATCH
--- backbone.js	2012-01-01 12:00:00.000000000 +0000
+++ backbone.js	2012-01-01 12:00:00.000000000 +0000
@@ -5,15 +5,27 @@
 //     For all details and documentation:
 //     http://backbonejs.org
 
-(function(){
+(function(root, factory) {
+  // Set up Backbone appropriately for the environment.
+  if (typeof exports !== 'undefined') {
+    // Node/CommonJS, no need for jQuery in that case.
+    factory(root, exports, require('underscore'));
+  } else if (typeof define === 'function' && define.amd) {
+    // AMD
+    define('backbone', ['underscore', 'jquery', 'exports'], function(_, $$, exports) {
+      // Export global even in AMD case in case this script is loaded with
+      // others that may still expect a global Backbone.
+      root.Backbone = factory(root, exports, _, $$);
+    });
+  } else {
+    // Browser globals
+    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender));
+  }
+}(this, function(root, Backbone, _, $$) {
 
   // Initial Setup
   // -------------
 
-  // Save a reference to the global object (`window` in the browser, `global`
-  // on the server).
-  var root = this;
-
   // Save the previous value of the `Backbone` variable, so that it can be
   // restored later on, if `noConflict` is used.
   var previousBackbone = root.Backbone;
@@ -22,32 +34,16 @@
   var slice = Array.prototype.slice;
   var splice = Array.prototype.splice;
 
-  // The top-level namespace. All public Backbone classes and modules will
-  // be attached to this. Exported for both CommonJS and the browser.
-  var Backbone;
-  if (typeof exports !== 'undefined') {
-    Backbone = exports;
-  } else {
-    Backbone = root.Backbone = {};
-  }
-
   // Current version of the library. Keep in sync with `package.json`.
   Backbone.VERSION = '0.9.2';
 
-  // Require Underscore, if we're on the server, and it's not already present.
-  var _ = root._;
-  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
-
-  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$$` variable.
-  var $$ = root.jQuery || root.Zepto || root.ender;
-
   // Set the JavaScript library that will be used for DOM manipulation and
   // Ajax calls (a.k.a. the `$$` variable). By default Backbone will use: jQuery,
   // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
   // alternate JavaScript library (or a mock library for testing your views
   // outside of a browser).
   Backbone.setDomLibrary = function(lib) {
-    $$ = lib;
+    $$ = Backbone;
   };
 
   // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
@@ -1428,4 +1424,5 @@
     throw new Error('A "url" property or function must be specified');
   };
 
-}).call(this);
+  return Backbone;
+}));
endef
export BACKBONE_AMD_PATCH
install-backbone:
	@$(MAKE) --no-print-directory install-script SCRIPT=BACKBONE
	@( cd $(BACKBONE_PATH) && echo "$$BACKBONE_AMD_PATCH" | patch --no-backup-if-mismatch -p0 )

define HANDLEBARS_AMD_PATCH
--- $(shell basename $(HANDLEBARS_DOWNLOAD))	2012-01-01 12:00:00.000000000 +0000
+++ $(shell basename $(HANDLEBARS_DOWNLOAD))	2012-01-01 12:00:00.000000000 +0000
@@ -1,3 +1,5 @@
+(function() {
+
 // lib/handlebars/base.js
 var Handlebars = {};
 
@@ -1548,3 +1550,13 @@
 
 Handlebars.template = Handlebars.VM.template;
 ;
+
+// AMD define happens at the end for compatibility with AMD loaders
+// that don't enforce next-turn semantics on modules.
+if (typeof define === 'function' && define.amd) {
+  define('handlebars', function() {
+    return Handlebars;
+  });
+}
+
+}).call(this);
endef
export HANDLEBARS_AMD_PATCH
install-handlebars:
	@$(MAKE) --no-print-directory install-script SCRIPT=HANDLEBARS
	@( cd $(HANDLEBARS_PATH) && echo "$$HANDLEBARS_AMD_PATCH" | patch --no-backup-if-mismatch -p0 )

install-less:
	@$(MAKE) --no-print-directory install-script SCRIPT=LESS

install-randexp:
	@$(MAKE) --no-print-directory install-script SCRIPT=RANDEXP

bundle-dependencies: bundle-scripts bundle-styles
	@echo "Bundles created successfully."

bundle-component:
	@mkdir -p "$(shell dirname $(BUNDLE_$(COMPONENT)))"
	@echo > "$(BUNDLE_$(COMPONENT))"
	@for component in $(DEPENDENCIES) ; do \
		cat "$$component" >> "$(BUNDLE_$(COMPONENT))" ; \
		echo >> "$(BUNDLE_$(COMPONENT))" ; \
	done
	@echo "Bundle '$(COMPONENT)' created successfully."

bundle-scripts:
	@$(MAKE) --no-print-directory bundle-component \
		COMPONENT=SCRIPTS \
		DEPENDENCIES='"$(JQUERY_PATH)$(shell basename $(JQUERY_DOWNLOAD))" "$(BOOTSTRAP_PATH)scripts/bootstrap.js" "$(UNDERSCORE_PATH)$(shell basename $(UNDERSCORE_DOWNLOAD))" "$(BACKBONE_PATH)$(shell basename $(BACKBONE_DOWNLOAD))" "$(HANDLEBARS_PATH)$(shell basename $(HANDLEBARS_DOWNLOAD))" "$(LESS_PATH)$(shell basename $(LESS_DOWNLOAD))" "$(RANDEXP_PATH)$(shell basename $(RANDEXP_DOWNLOAD))"'

bundle-styles:
	@$(MAKE) --no-print-directory bundle-component \
		COMPONENT=STYLES \
		DEPENDENCIES='"$(BOOTSTRAP_PATH)styles/bootstrap.css"'
