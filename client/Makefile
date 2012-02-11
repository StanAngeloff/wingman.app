PLATFORM := linux

CERTS_PATH  := system/config/certs/
DEPENDENCIES_PATH := system/modules/core/
VENDOR_PATH := system/cache/core/

JQUERY_VERSION  := 1.7.1
JQUERY_DOWNLOAD := http://code.jquery.com/jquery-$(JQUERY_VERSION).min.js
JQUERY_PATH     := $(VENDOR_PATH)jquery/

BOOTSTRAP_DOWNLOAD := http://twitter.github.com/bootstrap/assets/bootstrap.zip
BOOTSTRAP_PATH     := $(VENDOR_PATH)bootstrap/

UNDERSCORE_DOWNLOAD := http://documentcloud.github.com/underscore/underscore-min.js
UNDERSCORE_PATH     := $(VENDOR_PATH)underscore/

BACKBONE_DOWNLOAD := http://documentcloud.github.com/backbone/backbone-min.js
BACKBONE_PATH     := $(VENDOR_PATH)backbone/

BUNDLE_SCRIPTS := $(DEPENDENCIES_PATH)scripts/dependencies.bundle.js
BUNDLE_STYLES  := $(DEPENDENCIES_PATH)styles/dependencies.bundle.css

MONGOOSE_VERSION      := 3.0
MONGOOSE_DOWNLOAD     := http://mongoose.googlecode.com/files/mongoose-$(MONGOOSE_VERSION).tgz
MONGOOSE_PATH         := $(VENDOR_PATH)mongoose/
MONGOOSE_OPTIONS      := -D'CONFIG_FILE=\"../../../config/mongoose.config\"'
MONGOOSE_CERT_SUBJECT := /C=GB/ST=Oxfordshire/L=Oxford/O=Fake Company Ltd./OU=IT/CN=localhost

.PHONY: default all install-dependencies install-script install-jquery install-bootstrap install-underscore install-backbone bundle-dependencies bundle-component bundle-scripts bundle-styles issue-local-certificate compile-local-server start-local-server

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

all: install-dependencies bundle-dependencies compile-local-server

install-dependencies: install-jquery install-bootstrap install-underscore install-backbone

install-script:
	@mkdir -p "$($(SCRIPT)_PATH)"
	@curl -so "$($(SCRIPT)_PATH)$(shell basename $($(SCRIPT)_DOWNLOAD))" "$($(SCRIPT)_DOWNLOAD)"
	@echo "$($(SCRIPT)_DOWNLOAD) successfully installed in $($(SCRIPT)_PATH)."

install-jquery:
	@$(MAKE) install-script SCRIPT=JQUERY

install-bootstrap:
	$(eval BOOTSTRAP_TMP := /tmp/$(shell basename $(BOOTSTRAP_DOWNLOAD)))
	@curl -so "$(BOOTSTRAP_TMP)" "$(BOOTSTRAP_DOWNLOAD)"
	@if [ -d "$(BOOTSTRAP_PATH)" ]; then \
		rm -Rf "$(BOOTSTRAP_PATH)" ; \
	fi
	@mkdir -p "$(VENDOR_PATH)"
	@unzip -qq "$(BOOTSTRAP_TMP)" -d "$(VENDOR_PATH)"
	@for icons in 'glyphicons-halflings.png' 'glyphicons-halflings-white.png'; do \
		sed -e "s#../img/$${icons}#'data:image/png;base64,$$( base64 -w0 "$(BOOTSTRAP_PATH)img/$${icons}" )'#" -i "$(BOOTSTRAP_PATH)css/bootstrap.min.css" ; \
	done
	@for alias in 'css > styles' 'img > images' 'js > scripts'; do \
		mv "$(BOOTSTRAP_PATH)$${alias%% > *}" "$(BOOTSTRAP_PATH)$${alias##* > }" ; \
	done
	@for merge in 'styles/bootstrap-responsive.min.css > styles/bootstrap.min.css'; do \
		source="$(BOOTSTRAP_PATH)$${merge%% > *}" ; \
		target="$(BOOTSTRAP_PATH)$${merge##* > }" ; \
		echo           >> "$$target" ; \
		cat "$$source" >> "$$target" ; \
		rm  "$$source" ; \
	done
	@for garbage in 'images' 'scripts/bootstrap.js' 'styles/bootstrap.css' 'styles/bootstrap-responsive.css'; do \
		rm -R "$(BOOTSTRAP_PATH)$${garbage}" ; \
	done
	@echo "$(BOOTSTRAP_DOWNLOAD) successfully installed in $(BOOTSTRAP_PATH)."

install-underscore:
	@$(MAKE) install-script SCRIPT=UNDERSCORE

install-backbone:
	@$(MAKE) install-script SCRIPT=BACKBONE

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
	@$(MAKE) bundle-component \
		COMPONENT=SCRIPTS \
		DEPENDENCIES='"$(JQUERY_PATH)$(shell basename $(JQUERY_DOWNLOAD))" "$(BOOTSTRAP_PATH)scripts/bootstrap.min.js" "$(UNDERSCORE_PATH)$(shell basename $(UNDERSCORE_DOWNLOAD))" "$(BACKBONE_PATH)$(shell basename $(BACKBONE_DOWNLOAD))"'

bundle-styles:
	@$(MAKE) bundle-component \
		COMPONENT=STYLES \
		DEPENDENCIES='"$(BOOTSTRAP_PATH)styles/bootstrap.min.css"'

issue-local-certificate:
	@mkdir -p "$(CERTS_PATH)"
	@openssl req -x509 -nodes -days 3650 -subj "$(MONGOOSE_CERT_SUBJECT)" -newkey rsa:1024 -keyout "$(CERTS_PATH)mongoose.pem" -out "$(CERTS_PATH)mongoose.pem"
	@echo 'Certificate for local development server issued successfully.'

compile-local-server: issue-local-certificate
	$(eval MONGOOSE_TMP := /tmp/$(shell basename $(MONGOOSE_DOWNLOAD)))
	@curl -so "$(MONGOOSE_TMP)" "$(MONGOOSE_DOWNLOAD)"
	@if [ -d "$(MONGOOSE_PATH)" ]; then \
		rm -Rf "$(MONGOOSE_PATH)" ; \
	fi
	@tar zxf "$(MONGOOSE_TMP)" -C "$(VENDOR_PATH)"
	@( cd "$(MONGOOSE_PATH)" && $(MAKE) $(PLATFORM) COPT=$(MONGOOSE_OPTIONS) )
	@echo 'Local development server compiled successfully.'

start-local-server:
	@if [ ! -f "$(MONGOOSE_PATH)mongoose" ]; then \
		$(MAKE) compile-local-server; \
	fi
	@"$(MONGOOSE_PATH)mongoose"
