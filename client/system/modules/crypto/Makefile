VENDOR_PATH  := cache/vendor/
BUNDLES_PATH := bundles/

SJCL_DOWNLOAD := http://crypto.stanford.edu/sjcl/sjcl.zip
SJCL_PATH     := $(VENDOR_PATH)sjcl/

BUNDLE_SCRIPTS := $(BUNDLES_PATH)scripts-development.js

.PHONY: default all install-dependencies install-sjcl bundle-dependencies bundle-component bundle-scripts

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

all: install-dependencies bundle-dependencies

install-dependencies: install-sjcl

install-sjcl:
	$(eval SJCL_TMP := /tmp/$(shell basename $(SJCL_DOWNLOAD)))
	@curl -o "$(SJCL_TMP)" "$(SJCL_DOWNLOAD)"
	@if [ -d "$(SJCL_PATH)" ]; then \
		rm -Rf "$(SJCL_PATH)" ; \
	fi
	@mkdir -p "$(VENDOR_PATH)"
	@unzip -qq "$(SJCL_TMP)" -d "$(VENDOR_PATH)"
	@( cd $(SJCL_PATH) && ./configure --with-all --compress=none && make all tidy )
	@for garbage in 'browserTest' 'compress' 'demo' 'jsdoc*' 'lint' 'test'; do \
		find "$(SJCL_PATH)" -maxdepth 1 -name "$${garbage}" -exec rm -R {} \; ; \
	done
	@echo "$(SJCL_DOWNLOAD) successfully installed in $(SJCL_PATH)."

bundle-dependencies: bundle-scripts
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
		DEPENDENCIES='"$(SJCL_PATH)sjcl.js"'
