PLATFORM := linux

ASSETS_PATH := assets/
CERTS_PATH  := certs/
VENDOR_PATH := vendor/

BOOTSTRAP_DOWNLOAD := http://twitter.github.com/bootstrap/assets/bootstrap.zip
BOOTSTRAP_PATH     := $(VENDOR_PATH)bootstrap/

UNDERSCORE_DOWNLOAD := http://documentcloud.github.com/underscore/underscore-min.js
UNDERSCORE_PATH     := $(VENDOR_PATH)underscore/

BACKBONE_DOWNLOAD := http://documentcloud.github.com/backbone/backbone-min.js
BACKBONE_PATH     := $(VENDOR_PATH)backbone/

BUNDLE_SCRIPTS := $(ASSETS_PATH)scripts/dependencies.bundle.js
BUNDLE_STYLES  := $(ASSETS_PATH)styles/dependencies.bundle.css

MONGOOSE_DOWNLOAD     := http://mongoose.googlecode.com/files/mongoose-3.0.tgz
MONGOOSE_PATH         := $(VENDOR_PATH)mongoose/
MONGOOSE_OPTIONS      := -D'CONFIG_FILE=\"../../mongoose.config\"'
MONGOOSE_CERT_SUBJECT := /C=GB/ST=Oxfordshire/L=Oxford/O=Fake Company Ltd./OU=IT/CN=localhost

.PHONY: default all install-dependencies install-bootstrap install-underscore install-backbone bundle-dependencies bundle-component bundle-scripts bundle-styles compile-local-server issue-local-certificate

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

all: install-dependencies bundle-dependencies compile-local-server

install-dependencies: install-bootstrap install-underscore install-backbone

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
	@mkdir -p "$(UNDERSCORE_PATH)"
	@curl -so "$(UNDERSCORE_DOWNLOAD)" "$(UNDERSCORE_PATH)$(shell basename $(UNDERSCORE_DOWNLOAD))"
	@echo "$(UNDERSCORE_DOWNLOAD) successfully installed in $(UNDERSCORE_PATH)."

install-backbone:
	@mkdir -p "$(BACKBONE_PATH)"
	@curl -so "$(BACKBONE_DOWNLOAD)" "$(BACKBONE_PATH)$(shell basename $(BACKBONE_DOWNLOAD))"
	@echo "$(BACKBONE_DOWNLOAD) successfully installed in $(BACKBONE_PATH)."

bundle-dependencies:
	@$(MAKE) bundle-scripts 1>/dev/null
	@$(MAKE) bundle-styles  1>/dev/null
	@echo "Bundles created successfully."

bundle-component:
	@mkdir -p "$(shell dirname $(BUNDLE_$(COMPONENT)))"
	@echo > "$(BUNDLE_$(COMPONENT))"
	@for component in $(DEPENDENCIES) ; do \
		cat "$$component" >> "$(BUNDLE_$(COMPONENT))" ; \
		echo >> "$(BUNDLE_$(COMPONENT))" ; \
	done
	@echo "Bundle '$(COMPONENT)' created successfully."

bundle-scripts: COMPONENT    := SCRIPTS
bundle-scripts: DEPENDENCIES := \
	"$(BOOTSTRAP_PATH)scripts/bootstrap.min.js" \
	"$(UNDERSCORE_PATH)$(shell basename $(UNDERSCORE_DOWNLOAD))" \
	"$(BACKBONE_PATH)$(shell basename $(BACKBONE_DOWNLOAD))"
bundle-scripts: bundle-component

bundle-styles: COMPONENT    := STYLES
bundle-styles: DEPENDENCIES := \
	"$(BOOTSTRAP_PATH)styles/bootstrap.min.css"
bundle-styles: bundle-component

issue-local-certificate:
	@mkdir -p "$(CERTS_PATH)"
	@openssl req -x509 -nodes -days 3650 -subj "$(MONGOOSE_CERT_SUBJECT)" -newkey rsa:1024 -keyout "$(CERTS_PATH)mongoose.pem" -out "$(CERTS_PATH)mongoose.pem" 1>/dev/null
	@echo 'Certificate for local development server issued successfully.'

compile-local-server: issue-local-certificate
	$(eval MONGOOSE_TMP := /tmp/$(shell basename $(MONGOOSE_DOWNLOAD)))
	@curl -so "$(MONGOOSE_TMP)" "$(MONGOOSE_DOWNLOAD)"
	@if [ -d "$(MONGOOSE_PATH)" ]; then \
		rm -Rf "$(MONGOOSE_PATH)" ; \
	fi
	@tar zxf "$(MONGOOSE_TMP)" -C "$(VENDOR_PATH)"
	@( cd "$(MONGOOSE_PATH)" && $(MAKE) $(PLATFORM) COPT=$(MONGOOSE_OPTIONS) 1>/dev/null )
	@echo 'Local development server compiled successfully.'
