VENDOR_PATH  := cache/vendor/
BUNDLES_PATH := bundles/

JQUERY_VERSION  := 1.7.1
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

LESS_VERSION  := 1.2.2
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

install-underscore:
	@$(MAKE) --no-print-directory install-script SCRIPT=UNDERSCORE

install-backbone:
	@$(MAKE) --no-print-directory install-script SCRIPT=BACKBONE

install-handlebars:
	@$(MAKE) --no-print-directory install-script SCRIPT=HANDLEBARS

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
